import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeUserData = async (userData: any) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      console.log('User data stored successfully');
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  };
  
  export const getUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString !== null) {
        const userData = JSON.parse(userDataString);
        console.log('User data retrieved successfully:', userData);
        return userData;
      } else {
        console.log('No user data found');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };
  
  export const removeUserData = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      console.log('User data removed successfully');
    } catch (error) {
      console.error('Error removing user data:', error);
    }
  };
  