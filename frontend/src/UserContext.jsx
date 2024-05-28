import { createContext, useState } from "react";

// Context provides a way to pass data through the component tree without having to pass props down
//  manually at every leve
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
