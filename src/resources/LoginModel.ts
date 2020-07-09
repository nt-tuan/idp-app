export interface RequestLogin {
  skip: boolean;
  subject: string;
  client: string[];
  request_url: string;
  requested_scope: string[];
  oidc_context: any;
  context: any;
}

export interface LoginSchema {
  id: string;
  expires_at: Date;
  issues_at: Date;
  request_url: string;
  active: string;
  methods: {
    password: {
      method: string;
      config: {
        action: string;
        method: string;
        fields: {
          name: string;
          type: string;
          required: boolean;
          value?: string;
          messages?: string[];
        }[];
      };
    };
  };
}
