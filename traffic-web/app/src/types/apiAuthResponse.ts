import { UUID } from "crypto";

export type SignInCredentials = {
  phoneNumber: string;
  password: string;
};

export type UserRole = {
  id: UUID;
  name: string;
};

export type UserSignInResponse = {
  id: UUID;
  phoneNumber: string;
  roles: UserRole[];
};

export type SignInResponse = {
  accessToken: string;
  user: UserSignInResponse;
};
