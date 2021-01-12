export module Consent {
  export interface Jwks {}

  export interface Metadata {}

  export interface Client {
    allowed_cors_origins: string[];
    audience: string[];
    backchannel_logout_session_required: boolean;
    backchannel_logout_uri: string;
    client_id: string;
    client_name: string;
    client_secret: string;
    client_secret_expires_at: number;
    client_uri: string;
    contacts: string[];
    created_at: Date;
    frontchannel_logout_session_required: boolean;
    frontchannel_logout_uri: string;
    grant_types: string[];
    jwks: Jwks;
    jwks_uri: string;
    logo_uri: string;
    metadata: Metadata;
    owner: string;
    policy_uri: string;
    post_logout_redirect_uris: string[];
    redirect_uris: string[];
    request_object_signing_alg: string;
    request_uris: string[];
    response_types: string[];
    scope: string;
    sector_identifier_uri: string;
    subject_type: string;
    token_endpoint_auth_method: string;
    token_endpoint_auth_signing_alg: string;
    tos_uri: string;
    updated_at: Date;
    userinfo_signed_response_alg: string;
  }

  export interface Context {}

  export interface IdTokenHintClaims {}

  export interface OidcContext {
    acr_values: string[];
    display: string;
    id_token_hint_claims: IdTokenHintClaims;
    login_hint: string;
    ui_locales: string[];
  }

  export interface ConsentRequest {
    acr: string;
    challenge: string;
    client: Client;
    context: Context;
    login_challenge: string;
    login_session_id: string;
    oidc_context: OidcContext;
    request_url: string;
    requested_access_token_audience: string[];
    requested_scope: string[];
    skip: boolean;
    subject: string;
  }

  export interface AccessToken {}

  export interface IdToken {}

  export interface Session {
    access_token: AccessToken;
    id_token: IdToken;
  }

  export interface ConsentSession {
    consent_request: ConsentRequest;
    grant_access_token_audience: string[];
    grant_scope: string[];
    handled_at: Date;
    remember: boolean;
    remember_for: number;
    session: Session;
  }
}
