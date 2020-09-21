import ClientOAuth2 from "client-oauth2";

export interface StoredToken {
  accessToken: string;
  refreshToken: string;
  data: ClientOAuth2.Data;
}
