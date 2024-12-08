import { createContext, useContext, ReactNode, useState } from "react";

interface UserContextType {
  username: string;
  userId: string;
  setUserInfo: (username: string, userId: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  const setUserInfo = (newUsername: string, newUserId: string) => {
    setUsername(newUsername);
    setUserId(newUserId);
  };

  return (
    <UserContext.Provider value={{ username, userId, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
