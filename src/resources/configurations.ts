import { UserManagerSettings } from "oidc-client";

// const hydra = await Issuer.discover(`${process.env.REACT_APP_AUTH_URL}`);
export const oidcConfiguration: UserManagerSettings = {
  client_id: process.env.REACT_APP_CLIENT_ID,
  redirect_uri: "https://localhost:3000/callback",
  response_type: "code",
  post_logout_redirect_uri: "https://localhost:3000/logout/callback",
  scope: "openid profile offline",
  authority: process.env.REACT_APP_AUTH_URL,
  silent_redirect_uri: "http://localhost:3000/authentication/silent_callback",
  automaticSilentRenew: true,
  loadUserInfo: true,
};

export const constants = {
  AUTH_TOKEN_KEY: "auth_token",
};
