import React, { useEffect, useState } from "react";
import EditProfileComponent from "./Component";
import { usePocket } from "../../hooks/POcketContext";
import { client } from "../../utils/pocketbase";
import { auth } from "../../hooks/firebaseconfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref as dbref, get } from "firebase/database";

export interface IUserData {
  email: string;
  displayname: string;
  imageurl: string;
  uid: string;
}

const EditProfile = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IUserData>({
    email: "",
    displayname: "",
    imageurl: "",
    uid: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;

        const db = getDatabase();
        const userDocRef = dbref(db, `users/${userId}`);

        try {
          const userSnapshot = await get(userDocRef);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.val();
            setData({
              email: userData.email,
              displayname: userData.displayName,
              imageurl: userData.image,
              uid: userData.uid,
            });
          } else {
            console.error("User not found");
          }
        } catch (error) {
          console.error("Error getting user data:", error);
        } finally {
          setLoading(false); // Set loading to false after data retrieval
        }
      } else {
        // No user is signed in
        // Handle the case where the user is not logged in
        setLoading(false); // Set loading to false if no user is logged in
      }
    });

    return () => unsubscribe();
  }, []); // Removed `auth` from dependencies since it's a constant

  return loading ? null : (
    <EditProfileComponent
      email={data.email}
      username={data.displayname}
      avatar={data.imageurl}
      id={data.uid}
    />
  );
};

export default EditProfile;
