export const ROLE_ID = {
  Traffic: "edeb97b6-9c59-47c2-9efd-b4a5ed51a003",
  Admin: "4e15d077-e47e-42a8-8542-a23bef744ab5",
  Approver: "3fd2dd83-f2bc-4775-81e8-b3653f2f09bf",
  Agency: "a63faa54-42e1-43ee-86d0-3a9139a8c5f2",
} as const;

export type RoleKey = keyof typeof ROLE_ID;

export const getRoleId = (roleKey: RoleKey): string => {
  return ROLE_ID[roleKey];
};
