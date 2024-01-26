import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useContext, useEffect } from "react";
import { ReactNode } from "react";
import { getNotificationsForPost } from "../screens/Notification/getNotifications";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../hooks/firebaseconfig";

interface ThemeContextProps {
  isDarkTheme: boolean;
  toggleTheme: () => void;
  clear: () => void;
  count:number
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const [count, setCount] = useState<any>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
          const userId = user?.uid; // Replace with the actual post ID
          const fetchedNotifications = await getNotificationsForPost(userId);
          setCount(fetchedNotifications.length);
          console.log('-------------count-------------',fetchedNotifications)
        };
 
    });

    // Load theme state from AsyncStorage when the component mounts
    const loadThemeState = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("isDarkTheme");
        if (savedTheme !== null) {
          setIsDarkTheme(JSON.parse(savedTheme));
        }
      } catch (error) {
        console.error("Error loading theme state:", error);
      }
    };

    unsubscribe();
    loadThemeState();
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => {
      const newTheme = !prevTheme;
      // Save the new theme state to AsyncStorage
      AsyncStorage.setItem("isDarkTheme", JSON.stringify(newTheme));
      return newTheme;
    });
  }; 
  const clear = () => {
    setCount(null);
  };

  const contextValue: ThemeContextProps = {
    isDarkTheme,
    toggleTheme,
    clear,
    count,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export { ThemeProvider, useTheme };
