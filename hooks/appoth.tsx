import { ID, Account, Client, Databases } from "appwrite";

const appWriteClient = new Client();
const APPWRITE_ENDPOINT: string = "https://cloud.appwrite.io/v1";
const APPWRITE_PROJECTID: string = "6575a4e2805fd13d4517";
// export const Database_ID: string = "65758301400350a14770";
// export const Collection_ID: string = "657583dc98b988dd4f0b";
const databases = new Databases(appWriteClient);

type CreateUserAccount = {
  email: string;
  password: string;
  name: string;
};

type LoginUserAccount = {
  email: string;
  password: string;
};

const initAppWrite = () => {
  appWriteClient.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECTID);
};

const createAccount = async ({ email, password, name }: CreateUserAccount) => {
  try {
    initAppWrite();
    const account = new Account(appWriteClient);
    const userAccount = await account.create(ID.unique(), email, password, name);
    
    if (userAccount) {
      return login({ email, password });
    }
    
    return userAccount;
  } catch (error) {
    console.log("AppWrite service not working");
    console.log(error);
  }
};

const login = async ({ email, password }: LoginUserAccount) => {
  try {
    initAppWrite();
    const account = new Account(appWriteClient);
    return await account.createEmailSession(email, password);
  } catch (error) {
    console.log("Login failed");
  }
};

const getCurrentUser = async () => {
  try {
    initAppWrite();
    const account = new Account(appWriteClient);
    const detail = await account.get();
    console.log(detail);
    return detail;
  } catch (error) {
    console.log("Get current user error");
  }
};

const logout = async () => {
  try {
    initAppWrite();
    const account = new Account(appWriteClient);
    await account.deleteSession("current");
  } catch (error) {
    console.log("Logout error");
  }
};

export { createAccount, login, getCurrentUser, logout };
