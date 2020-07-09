export interface GetConsentResponse {
  challenge: string;
  requested_scopes: string[];
  user: string;
  client: string[];
}

export interface PostConsentResponse {
  redirect_to: string;
  error: string;
  error_description: string;
}
