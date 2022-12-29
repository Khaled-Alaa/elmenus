type Role = "admin" | "user";

export type TUser = {
  id: number;
  username: string;
  password: string;
  role: Role;
};

export type TCategory = {
  id: number;
  name: string;
};

export type TCategoryItem = {
  image: string;
  id: number;
  name: string;
  description: string;
  price: number;
  categorId: number;
};
