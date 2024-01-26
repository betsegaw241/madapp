import { getDatabase, ref, get } from 'firebase/database';

const fetchUserData = async (userId: string, setUserCallback: (userData: any) => void) => {
  if (userId) {
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}`);

    try {
      const userSnapshot = await get(userRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.val();
        setUserCallback(userData);
      } else {
        console.error("User not found");
        setUserCallback(null); // Set user data to null or handle the case where the user is not found
      }
    } catch (error) {
      console.error("Error getting user data:", error);
      setUserCallback(null); // Set user data to null or handle the error case
    }
  } else {
    console.error("Invalid userId");
    setUserCallback(null); // Set user data to null or handle the case where the userId is invalid
  }
};

export default fetchUserData;
