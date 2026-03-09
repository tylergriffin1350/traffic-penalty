export type PenalityType = {
  id: string;
  name: string;
  code: string;
  point: number;
  fee: number;
  createdAt: string;
  updatedAt: string;
};

export type PenalityTypePostData = Omit<
  PenalityType,
  "createdAt" | "id" | "updatedAt"
>;
export type PenalityTypePutData = Omit<PenalityType, "createdAt" | "updatedAt">;
export type PenalityTypeDeleteData = Pick<PenalityType, "id">;
