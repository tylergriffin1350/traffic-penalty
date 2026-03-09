import {
  Roles,
  RolePostData,
  RolePutData,
  RoleDeleteData,
} from "@/types/roles";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosAuth } from "@/lib/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { APIErrorResponse, APISuccessResponse } from "@/types/api";

// Keys for React Query
export const userKeys = {
  all: ["roles"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (filters: { search?: string; page?: number; limit?: number }) =>
    [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

export const roleManipulation = () => {
  const queryClient = useQueryClient();

  const createRoleMutation = useMutation({
    mutationFn: async (data: RolePostData) => {
      const response = await axiosAuth.post("/api/v1/role", data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate lists queries to ensure fresh data
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toast.success("Role created successfully!");
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      // Don't show toast for field-specific errors
      if (!error.response?.data?.fieldErrors) {
        toast.error(
          error.response?.data?.details ||
            error.message ||
            "Failed to create role. Please try again."
        );
      }
      throw error;
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: async (data: RolePutData) => {
      const response = await axiosAuth.patch(`/api/v1/role/${data.id}`, data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate lists queries to ensure fresh data
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toast.success("Role updated successfully!");
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      // Don't show toast for field-specific errors
      if (!error.response?.data?.fieldErrors) {
        toast.error(
          error.response?.data?.details ||
            error.message ||
            "Failed to update role. Please try again."
        );
      }
      throw error;
    },
  });

  const deleteRoleMutation = useMutation({
    mutationFn: async (data: RoleDeleteData) => {
      const response = await axiosAuth.delete(`/api/v1/role/${data.id}`);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate lists queries to ensure fresh data
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toast.success("Role deleted successfully!");
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      toast.error(
        error.response?.data?.details ||
          error.message ||
          "Failed to delete role. Please try again."
      );
    },
  });

  return {
    createRole: (data: RolePostData) => createRoleMutation.mutateAsync(data),
    updateRole: (data: RolePutData) => updateRoleMutation.mutateAsync(data),
    deleteRole: (data: RoleDeleteData) => deleteRoleMutation.mutateAsync(data),
    isCreating: createRoleMutation.isPending,
    isUpdating: updateRoleMutation.isPending,
    isDeleting: deleteRoleMutation.isPending,
    error:
      createRoleMutation.error ||
      updateRoleMutation.error ||
      deleteRoleMutation.error,
  };
};

export const useRoles = (page: number, perPage: number, search?: string) => {
  const query = useQuery({
    queryKey: userKeys.list({ page, limit: perPage, search }),
    queryFn: async () => {
      const response = await axiosAuth.get<APISuccessResponse>("/api/v1/role", {
        params: {
          page,
          limit: perPage,
          search,
        },
      });

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
