import {
  DriverDeleteData,
  DriverPostData,
  DriverPutData,
  Driver,
} from "@/types/driver";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosAuth } from "@/lib/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { APIErrorResponse, APISuccessResponse } from "@/types/api";
import { Penality, PenalityPostData, Penalty } from "@/types/penality";

interface AddPenaltyVariables {
  driverId: string;
  penalityData: PenalityPostData;
}

// Keys for React Query
export const userKeys = {
  all: ["drivers"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (filters: { search?: string; page?: number; limit?: number }) =>
    [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
  detailByLicense: (licenseNumber: string) =>
    [...userKeys.details(), "license", licenseNumber] as const,
  detailByPhone: (phoneNumber: string) =>
    [...userKeys.details(), "phone", phoneNumber] as const,
};

export const penaltyKeys = {
  all: ["penalties"] as const,
  lists: () => [...penaltyKeys.all, "list"] as const,
  listByDriver: (
    driverId: string | undefined,
    params: { page?: number; limit?: number }
  ) => [...penaltyKeys.lists(), "byDriver", driverId, params] as const,
};

export const useDriverByLicense = (
  licenseNumber: string | undefined,
  options?: { enabled?: boolean }
) => {
  return useQuery<Driver, AxiosError<APIErrorResponse>>({
    queryKey: userKeys.detailByLicense(licenseNumber!),
    queryFn: async () => {
      if (!licenseNumber) {
        throw new Error("License number is required");
      }

      const response = await axiosAuth.get<Driver>(
        `/api/v1/driver/by-license/${encodeURIComponent(licenseNumber)}`
      );
      return response.data;
    },

    enabled: !!licenseNumber && (options?.enabled ?? true),
    retry: (failureCount, error) => {
      // Don't retry on 404 (Not Found) errors
      if (error.response?.status === 404) {
        return false;
      }
      // Default retry behavior for other errors (usually 3 retries)
      return failureCount < 3;
    },
  });
};
export const useDriverByPhone = (
  phoneNumber: string | undefined,
  options?: { enabled?: boolean }
) => {
  return useQuery<Driver, AxiosError<APIErrorResponse>>({
    queryKey: userKeys.detailByPhone(phoneNumber!),
    queryFn: async () => {
      if (!phoneNumber) {
        throw new Error("phone number is required");
      }

      const response = await axiosAuth.get<Driver>(
        `/api/v1/driver/by-phone/${encodeURIComponent(phoneNumber)}`
      );
      return response.data;
    },

    enabled: !!phoneNumber && (options?.enabled ?? true),
    retry: (failureCount, error) => {
      // Don't retry on 404 (Not Found) errors
      if (error.response?.status === 404) {
        return false;
      }
      // Default retry behavior for other errors (usually 3 retries)
      return failureCount < 3;
    },
  });
};
export const useDriverById = (
  driverId: string | undefined,
  options?: { enabled?: boolean }
) => {
  return useQuery<Driver, AxiosError<APIErrorResponse>>({
    queryKey: userKeys.detail(driverId!),
    queryFn: async () => {
      if (!driverId) {
        throw new Error("Driver Id is required");
      }

      const response = await axiosAuth.get<Driver>(
        `/api/v1/driver/by-id/${encodeURIComponent(driverId)}`
      );
      return response.data;
    },

    enabled: !!driverId && (options?.enabled ?? true),
    retry: (failureCount, error) => {
      // Don't retry on 404 (Not Found) errors
      if (error.response?.status === 404) {
        return false;
      }
      // Default retry behavior for other errors (usually 3 retries)
      return failureCount < 3;
    },
  });
};

export const usePenaltiesByDriver = (
  driverId: string | undefined,
  paginationParams: { page?: number; limit?: number } = {},
  options?: { enabled?: boolean }
) => {
  return useQuery<Penalty[], AxiosError<APIErrorResponse>>({
    queryKey: penaltyKeys.listByDriver(driverId, paginationParams),
    queryFn: async () => {
      if (!driverId) {
        throw new Error("Driver ID is required");
      }

      const url = `/api/v1/driver/${encodeURIComponent(driverId)}/penalty`;

      // Pass paginationParams as query parameters
      const response = await axiosAuth.get<Penalty[]>(url, {
        params: paginationParams,
      });
      return response.data;
    },

    enabled: !!driverId && (options?.enabled ?? true),
  });
};

export const driverManipulation = () => {
  const queryClient = useQueryClient();

  const createDriverMutation = useMutation({
    mutationFn: async (data: DriverPostData) => {
      const response = await axiosAuth.post("/api/v1/driver", data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate lists queries to ensure fresh data
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toast.success("Driver created successfully!");
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      // Don't show toast for field-specific errors
      if (!error.response?.data?.fieldErrors) {
        toast.error(
          error.response?.data?.details ||
            error.message ||
            "Failed to create driver. Please try again."
        );
      }
      throw error;
    },
  });

  const updateDriverMutation = useMutation({
    mutationFn: async (data: DriverPutData) => {
      const response = await axiosAuth.patch(`/api/v1/driver/${data.id}`, data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate lists queries to ensure fresh data
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toast.success("Driver updated successfully!");
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      // Don't show toast for field-specific errors
      if (!error.response?.data?.fieldErrors) {
        toast.error(
          error.response?.data?.details ||
            error.message ||
            "Failed to update driver. Please try again."
        );
      }
      throw error;
    },
  });

  const deleteDriverMutation = useMutation({
    mutationFn: async (data: DriverDeleteData) => {
      const response = await axiosAuth.delete(`/api/v1/driver/${data.id}`);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate lists queries to ensure fresh data
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toast.success("Driver deleted successfully!");
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      toast.error(
        error.response?.data?.details ||
          error.message ||
          "Failed to delete driver. Please try again."
      );
    },
  });

  return {
    createDriver: (data: DriverPostData) =>
      createDriverMutation.mutateAsync(data),
    updateDriver: (data: DriverPutData) =>
      updateDriverMutation.mutateAsync(data),
    deleteDriver: (data: DriverDeleteData) =>
      deleteDriverMutation.mutateAsync(data),
    isCreating: createDriverMutation.isPending,
    isUpdating: updateDriverMutation.isPending,
    isDeleting: deleteDriverMutation.isPending,
    error:
      createDriverMutation.error ||
      updateDriverMutation.error ||
      deleteDriverMutation.error,
  };
};

export const useDrivers = (page: number, perPage: number, search?: string) => {
  const query = useQuery({
    queryKey: userKeys.list({ page, limit: perPage, search }),
    queryFn: async () => {
      const response = await axiosAuth.get<APISuccessResponse>(
        "/api/v1/driver",
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

export const penalityManipulation = () => {
  const queryClient = useQueryClient();

  const addPenaltyMutation = useMutation<
    Penality,
    AxiosError<APIErrorResponse>,
    AddPenaltyVariables
  >({
    mutationFn: async ({ driverId, penalityData }) => {
      const response = await axiosAuth.post<Penality>(
        `/api/v1/driver/${encodeURIComponent(driverId)}/penalty`,
        penalityData
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      toast.success("Penalty added successfully!");
      queryClient.invalidateQueries({
        queryKey: [...penaltyKeys.lists(), "byDriver", variables.driverId],
      });
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      const fieldErrors = error.response?.data?.fieldErrors;
      const generalMessage =
        error.response?.data?.details ||
        error.message ||
        "Failed to add penalty. Please try again.";

      if (!fieldErrors || Object.keys(fieldErrors).length === 0) {
        toast.error(generalMessage);
      }

      console.error(
        "Add penalty error:",
        error.response?.data || error.message
      );
    },
  });

  return {
    addPenalty: (vars: AddPenaltyVariables) =>
      addPenaltyMutation.mutateAsync(vars),
    isAddingPenalty: addPenaltyMutation.isPending,
    addPenaltyError: addPenaltyMutation.error,
  };
};
