"use client";
import { User, UserPostData, UserPutData } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosAuth } from "@/lib/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { APIErrorResponse, APISuccessResponse } from "@/types/api";

// Keys for React Query
export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (filters: {
    search?: string;
    page?: number;
    limit?: number;
    type?: string;
  }) => [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

export const userManipulation = () => {
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: async (data: UserPostData) => {
      await axiosAuth.post("/api/v1/auth/register", data);
      return;
    },
    onSuccess: () => {
      // Invalidate lists queries to ensure fresh data
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toast.success("User account created successfully!");
    },
    onError: (error: any) => {
      // Don't show toast for field-specific errors
      if (!error.response?.data?.fieldErrors) {
        toast.error(
          error.response?.data?.error ||
            "Failed to create user account. Please try again."
        );
      }
      throw error;
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async (data: UserPutData) => {
      const response = await axiosAuth.patch(
        `/api/v1/auth/users/${data.id}`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate lists queries to ensure fresh data
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toast.success("User updated successfully!");
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      // Don't show toast for field-specific errors
      if (!error.response?.data?.fieldErrors) {
        toast.error(
          error.response?.data?.error ||
            "Failed to update user. Please try again."
        );
      }
      throw error;
    },
  });

  return {
    createUser: (data: UserPostData) => createUserMutation.mutateAsync(data),
    updateUser: (data: UserPutData) => updateUserMutation.mutateAsync(data),
    isCreating: createUserMutation.isPending,
    isUpdating: updateUserMutation.isPending,
    error: createUserMutation.error || updateUserMutation.error,
  };
};

export const useUsers = (page: number, perPage: number, search?: string) => {
  const query = useQuery({
    queryKey: userKeys.list({ page, limit: perPage, search }),
    queryFn: async () => {
      const response = await axiosAuth.get<APISuccessResponse>(
        "/api/v1/auth/users",
        {
          params: {
            page,
            limit: perPage,
            search,
          },
        }
      );

      return {
        data: response.data.data,
        total: response.data.meta.total,
        totalPages: response.data.meta.totalPages,
        currentPage: response.data.meta.page,
        limit: response.data.meta.limit,
      };
    },
  });

  return {
    ...query,
  };
};
