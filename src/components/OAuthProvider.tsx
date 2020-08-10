import React, { useContext, createContext, useState, useEffect } from "react";
import { useCookies, CookiesProvider } from "react-cookie";
export interface IOAuthContextValue {
  user?: string;
}

export const OAuthContext = createContext<IOAuthContextValue>({});

export const OAuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<string>();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  useEffect(() => {
    const user = cookies.user;
    setUser(user);
  }, [cookies]);

  return (
    <OAuthContext.Provider value={{ user }}>{children}</OAuthContext.Provider>
  );
};

export const OAuthWrapper = ({ children }: { children: JSX.Element }) => {
  return (
    <CookiesProvider>
      <OAuthProvider>{children}</OAuthProvider>
    </CookiesProvider>
  );
};
