import React, { FC, PropsWithChildren, useState } from "react";
import { AppContextType } from "./authprovider";
import { createAccount, getCurrentUser, login, logout } from "./appoth";

export const AppwriteContext = React.createContext<AppContextType>({
    appwrite: {
      createAccount,
      login,
      getCurrentUser,
      logout,
    },
    isLoggedIn: false,
    setIsLoggedIn: () => {},
  });
  
  export const AppWriteProvider: FC<PropsWithChildren<{}>> = ({ children }:any) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    const defaultValue: AppContextType = {
      appwrite: {
        createAccount,
        login,
        getCurrentUser,
        logout,
      },
      isLoggedIn,
      setIsLoggedIn,
    };
  
    return (
      <AppwriteContext.Provider value={defaultValue}>
      {children}
    </AppwriteContext.Provider>
    );
  };
  