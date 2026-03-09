export type Roles = {
  id: string;
  name: string;
  description?: string | null;
  createdAt: string;
};

export type RolePostData = Omit<Roles, "createdAt" | "id">;
export type RolePutData = Omit<Roles, "createdAt">;
export type RoleDeleteData = Pick<Roles, "id">;
