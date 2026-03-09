export type Driver = {
  id: string;
  name: string;
  age: number;
  sex: string;
  city: string;
  kebele: string;
  licenseNumber: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
};

export type DriverPostData = Omit<Driver, "createdAt" | "id" | "updatedAt">;
export type DriverPutData = Omit<Driver, "createdAt" | "updatedAt">;
export type DriverDeleteData = Pick<Driver, "id">;
