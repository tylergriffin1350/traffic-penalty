export type Role = {
  id: string;
  name: string;
};

export type User = {
  id: string;
  phoneNumber: string;
  roles: Role[];
};

export type UserData = {
  id: string;
  phoneNumber: string;
  roles: [
    {
      id: string;
      name: string;
    }
  ];
};

export type UserPostData = {
  id?: string;
  phoneNumber: string;
  password: string;
  roleId: string;
};
export type UserPutData = {
  id?: string;
  phoneNumber: string;
  roleId: string;
};
