import ClientOAuth2 from "client-oauth2";

// var ClientOAuth2 = require("client-oauth2");

export const auth = new ClientOAuth2({
  clientId: process.env.REACT_APP_CLIENT_ID,
  accessTokenUri: `${process.env.REACT_APP_AUTH_URL}/oauth2/token`,
  authorizationUri: `${process.env.REACT_APP_AUTH_URL}/oauth2/auth`,
  redirectUri: `${process.env.REACT_APP_URL}/callback`,
  scopes: ["openid", "offline", "profile"],
});
