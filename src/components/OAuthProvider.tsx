import React, { useContext, createContext, useState, useEffect } from "react";
import { useCookies, CookiesProvider } from "react-cookie";
import ClientOAuth2 from "client-oauth2";
import { constants } from "resources/constants";
import { StoredToken } from "resources/authToken";
import { auth, authInfo } from "resources/auth";
export interface IOAuthContextValue {
  token?: ClientOAuth2.Token;
  user?: string;
  roles?: string;
  setToken?: (token: ClientOAuth2.Token) => void;
}

export const OAuthContext = createContext<IOAuthContextValue>({});

export const OAuthProvider = ({ children }: { children: JSX.Element }) => {
  const [token, setToken] = useState<ClientOAuth2.Token>();
  const [user, setUser] = useState<string>();
  const [roles, setRoles] = useState<string>();
  const [cookies, setCookie, removeCookie] = useCookies([
    constants.AUTH_TOKEN_KEY,
  ]);

  useEffect(() => {
    try {
      var data = cookies[constants.AUTH_TOKEN_KEY];
      console.log(data);
      const token = auth.createToken(
        data.accessToken,
        data.refreshToken,
        data.data
      );
      setToken(token);
      authInfo.setToken(token);
    } catch (err) {
      console.log(err);
      setToken(undefined);
      authInfo.clearToken();
    }
  }, [cookies]);

  useEffect(() => {
    if (token === undefined) {
      setUser(undefined);
      setRoles(undefined);
      return;
    }
    const { url, method, headers } = token.sign({
      method: "GET",
      url: `${process.env.REACT_APP_AUTH_URL}/userinfo`,
      headers: { "Content-Type": "application/json" },
    });
    fetch(url, { headers, method })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject();
        }
        return response.json();
      })
      .then((userinfo) => {
        setUser(userinfo.sub);
        setRoles(userinfo.roles);
      })
      .catch();
  }, [token]);

  return (
    <OAuthContext.Provider value={{ token, setToken, user, roles }}>
      {children}
    </OAuthContext.Provider>
  );
};

export const OAuthWrapper = ({ children }: { children: JSX.Element }) => {
  return (
    <CookiesProvider>
      <OAuthProvider>{children}</OAuthProvider>
    </CookiesProvider>
  );
};
