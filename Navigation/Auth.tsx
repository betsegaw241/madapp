import { useEffect, useState } from "react";
import Tabs from "./Tabs";
import LoadingScreen from "../utils/LoadingScreen";
import { AouthStack } from "./Stacks";
import { User, onAuthStateChanged } from 'firebase/auth';
import { app ,auth} from '../hooks/firebaseconfig';

export default function Auth() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  // Check if there is a logged-in user
  const isLoggedIn = !!user;

  return isLoggedIn ? <Tabs /> : <AouthStack />;
}