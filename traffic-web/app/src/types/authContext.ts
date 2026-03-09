import { UserSignInResponse } from "./apiAuthResponse";

export type AuthContextType =  {
  setUser: (user: UserSignInResponse) => void;
  user: UserSignInResponse | null;
  token: string | null | undefined;
  setToken: (token: string | null) => void;
  SignOut: () => void;
  setCookieWithExpiration: (name: string, value: string, hours: number) => void;
  avatar: string;
  setAvatar: (avatar: string) => void;
  refreshAuthToken: () => Promise<void>;
}
