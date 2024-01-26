import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from 'firebase/storage';
import { getDatabase } from "firebase/database";

// Optionally import the services that you want to use

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDzbWKwWj4AMt9UyvLu9A4xJ_Zc_EL0oyM",
  authDomain: "eventpost-69eca.firebaseapp.com",
  databaseURL: "https://eventpost-69eca-default-rtdb.firebaseio.com",
  projectId: "eventpost-69eca",
  storageBucket: "eventpost-69eca.appspot.com",
  messagingSenderId: "2587541717",
  appId: "1:2587541717:web:0544aa6961e01df62ca25c",
  measurementId: "G-J271XGN3CR"
};


 const app = initializeApp(firebaseConfig);
 
 const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const storage = getStorage(app);
const database = getDatabase(app);

export { app, auth, storage ,database};