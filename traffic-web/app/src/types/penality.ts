import { Driver } from "./driver";
import { PenalityType } from "./penalityType";
import { Vehicle } from "./vehicle";

export type Penality = {
  id: string;
  name: string;
  code: string;
  point: number;
  fee: number;
  createdAt: string;
  updateddAt: string;
};

export type PenalityPostData = {
  address: string;
  committedAt: string;
  penaltyTypeId: string;
  vehicle: {
    type: string;
    plate: string;
    loadCapacity: number;
  };
  operatorId: string;
};

export type PenalityPutData = Omit<Penality, "createdAt" | "updatedAt">;
export type PenalityDeleteData = Pick<Penality, "id">;

export type OperatorNested = {
  id: string;
  phoneNumber: string;
  password?: string;
  refreshToken?: string;
  createdAt: string;
  updatedAt: string;
};

export type Penalty = {
  id: string;
  penaltyTypeId: string;
  address: string;
  committedAt: string;
  vehicleId: string;
  operatorId: string;
  driverId: string;
  createdAt: string;
  updatedAt: string;
  driver: Driver;
  vehicle: Vehicle;
  penaltyType: PenalityType;
  operator: OperatorNested;
};
