import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { axiosAuth } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthClientProvider";
import { SignInCredentials, UserSignInResponse } from "@/types/apiAuthResponse";
import axios from "axios";
import { rolePermissions } from "@/config/roles";

export const useAuth = () => {
  const router = useRouter();
  const { setUser, setToken, setCookieWithExpiration } = useAuthContext();

  const signInMutation = useMutation<string[], Error, SignInCredentials>({
    mutationFn: async (credentials: SignInCredentials) => {
      const response = await axiosAuth.post("/api/v1/auth/login", {
        phoneNumber: credentials.phoneNumber,
        password: credentials.password,
      });

      const token = response.data.accessToken;
      const refreshToken = response.data.refreshToken;
      const user: UserSignInResponse = response.data.user;

      // Get first role from user object
      const roleId = user.roles?.[0]?.id;
      if (!roleId || !rolePermissions[roleId]) {
        throw new Error(
          "This account does not have permission to access this app."
        );
      }

      // Save tokens and user info
      setCookieWithExpiration("token", token, 1);
      setCookieWithExpiration("refresh_token", refreshToken, 1);
      setCookieWithExpiration("user", JSON.stringify(user), 1); // optional, for persistence

      setUser(user);
      setToken(token);

      // Return permissions
      return rolePermissions[roleId].permissions;
    },

    onError: (error: Error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.error || "Failed to sign in. Please try again."
        );
      } else {
        toast.error(error.message);
      }
    },

    onSuccess: (permissions: string[]) => {
      router.push("/dashboard");
      toast.success("Login successful!");
    },
  });

  return {
    signIn: (data: SignInCredentials) => signInMutation.mutate(data),
    isPending: signInMutation.isPending,
    error: signInMutation.error,
  };
};
