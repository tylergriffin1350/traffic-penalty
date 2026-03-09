import {
  PenalityTypeDeleteData,
  PenalityTypePostData,
  PenalityTypePutData,
} from "@/types/penalityType";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosAuth } from "@/lib/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { APIErrorResponse, APISuccessResponse } from "@/types/api";

// Keys for React Query
export const userKeys = {
  all: ["penalityTypes"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (filters: { search?: string; page?: number; limit?: number }) =>
    [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

export const penalityTypeManipulation = () => {
  const queryClient = useQueryClient();

  const createPenalityTypeMutation = useMutation({
    mutationFn: async (data: PenalityTypePostData) => {
      const response = await axiosAuth.post("/api/v1/penaltyType", data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate lists queries to ensure fresh data
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toast.success("PenaltyType created successfully!");
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      // Don't show toast for field-specific errors
      if (!error.response?.data?.fieldErrors) {
        toast.error(
          error.response?.data?.details ||
            error.message ||
            "Failed to create PenaltyType. Please try again."
        );
      }
      throw error;
    },
  });

  const updatePenalityTypeMutation = useMutation({
    mutationFn: async (data: PenalityTypePutData) => {
      const response = await axiosAuth.patch(
        `/api/v1/penaltyType/${data.id}`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate lists queries to ensure fresh data
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toast.success("PenaltyType updated successfully!");
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      // Don't show toast for field-specific errors
      if (!error.response?.data?.fieldErrors) {
        toast.error(
          error.response?.data?.details ||
            error.message ||
            "Failed to update PenaltyType. Please try again."
        );
      }
      throw error;
    },
  });

  const deletePenalityTypeMutation = useMutation({
    mutationFn: async (data: PenalityTypeDeleteData) => {
      const response = await axiosAuth.delete(`/api/v1/penaltyType/${data.id}`);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate lists queries to ensure fresh data
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toast.success("PenaltyType deleted successfully!");
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      toast.error(
        error.response?.data?.details ||
          error.message ||
          "Failed to delete PenaltyType. Please try again."
      );
    },
  });

  return {
    createPenalityType: (data: PenalityTypePostData) =>
      createPenalityTypeMutation.mutateAsync(data),
    updatePenalityType: (data: PenalityTypePutData) =>
      updatePenalityTypeMutation.mutateAsync(data),
    deletePenalityType: (data: PenalityTypeDeleteData) =>
      deletePenalityTypeMutation.mutateAsync(data),
    isCreating: createPenalityTypeMutation.isPending,
    isUpdating: updatePenalityTypeMutation.isPending,
    isDeleting: deletePenalityTypeMutation.isPending,
    error:
      createPenalityTypeMutation.error ||
      updatePenalityTypeMutation.error ||
      deletePenalityTypeMutation.error,
  };
};

export const usePenalityTypes = (
  page: number,
  perPage: number,
  search?: string
) => {
  const query = useQuery({
    queryKey: userKeys.list({ page, limit: perPage, search }),
    queryFn: async () => {
      const response = await axiosAuth.get<APISuccessResponse>(
        "/api/v1/penaltyType",
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
