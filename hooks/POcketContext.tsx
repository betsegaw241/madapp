import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from "react";
import PocketBase from "pocketbase";
import { useInterval } from "usehooks-ts";
import jwtDecode from "jwt-decode";
import ms from "ms";

const BASE_URL = "https://eventpost.pockethost.io/";
const fiveMinutesInMs = ms("5 minutes");
const twoMinutesInMs = ms("2 minutes");

const PocketContext = createContext({});

export const PocketProvider = ({ children }: any) => {
  const pb = useMemo(() => new PocketBase(BASE_URL), []);

  const [token, setToken] = useState(pb.authStore.token);
  const [user, setUser] = useState(pb.authStore.model);

  useEffect(() => {
    return pb.authStore.onChange((token, model) => {
      setToken(token);
      setUser(model);
    });
  }, []);

  const register = useCallback(async (email: any, password: any) => {
    return await pb
      .collection("users")
      .create({ email, password, passwordConfirm: password });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const result = await pb
      .collection("users")
      .authWithPassword(email, password);
    console.log("--------------------", result.record);
    return result;
  }, []);

  const logout = useCallback(() => {
    pb.authStore.clear();
  }, []);

  const getusersData = useCallback(async () => {
    return await pb.collection("users").getOne("aacaolbambgz3au");
  }, []);

  const handleEditProfile = useCallback(async (id: string,username: string,email: string) => {
    const result = await pb.collection("users").update(id, {
      username:username,
      email:email
    });
  }, []);
  
  const handleCreateEvent = useCallback(async  (title: string,description: string,location:string,date:Date,selectedImages:any) => {
    const result = await pb.collection("posts").create({
      title:title,
      description:description,
      userId:"aacaolbambgz3au",
      location:location,
      date:date,
      images:selectedImages

    });
  }, []);

 
  const uploadImage = useCallback(async  ( selectedImages:any) => {
    const record = await pb.collection("posts").update("mk8tj1pxlsi8lsm", {   
      images:selectedImages

    });
  }, []);



  
  // const refreshSession = useCallback(async () => {
  //   if (!pb.authStore.isValid) return;
  //   const decoded = jwtDecode(token);
  //   const tokenExpiration = decoded.exp;
  //   const expirationWithBuffer = (decoded.exp + fiveMinutesInMs) / 1000;
  //   if (tokenExpiration < expirationWithBuffer) {
  //     await pb.collection("users").authRefresh();
  //   }
  // }, [token]);

  // useInterval(refreshSession, token ? twoMinutesInMs : null);
  // console.log(user.token,'login -----------------');

  return (
    <PocketContext.Provider
      value={{
        register,
        login,
        logout,
        user,
        token,
        pb,
        getusersData,
        handleEditProfile,
        handleCreateEvent,
        uploadImage,
      }}
    >
      {children}
    </PocketContext.Provider>
  );
};

export const usePocket: any = () => useContext(PocketContext);
