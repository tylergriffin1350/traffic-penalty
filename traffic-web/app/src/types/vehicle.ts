export type Vehicle = {
  id: string;
  plate: string;
  type: string;
  loadCapacity: number;
  createdAt: string;
  updateddAt: string;
};

export type VehiclePostData = Omit<Vehicle, "createdAt" | "id" | "updatedAt">;
export type VehiclePutData = Omit<Vehicle, "createdAt" | "updatedAt">;
export type VehicleDeleteData = Pick<Vehicle, "id">;
