import { EnvType } from 'ts-dotenv';

export interface AuthEnvironmentVariables {
  ISSUER_BASE_URL: string;
  AUTHORIZATION_URL: string;
  TOKEN_URL: string;
  USER_INFO_URL: string;
  CALLBACK_URL: string;
  CLIENT_ID: string;
  CLIENT_SECRET: string;
  BASE_URL: string;
  SCOPE: string;
}

export const schema = {
  ISSUER_BASE_URL: String,
  AUTHORIZATION_URL: String,
  TOKEN_URL: String,
  USER_INFO_URL: String,
  CALLBACK_URL: String,
  CLIENT_ID: String,
  CLIENT_SECRET: String,
  BASE_URL: String,
  SCOPE: String,
} as const;

export type AuthEnv = EnvType<typeof schema>;

export interface DisplayName {
  givenName: string;
  familyName: string;
}

export interface UserEmail {
  value: string;
}

export interface ShibbolethUser {
  id: string;
  displayName: string;
  name: DisplayName;
  emails: UserEmail[];
}
