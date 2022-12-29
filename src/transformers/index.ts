import { TCategory, TCategoryItem, TUser } from "../interfaces";

export const categoryTransformer = (data: TCategory[]): TCategory[] => data;

export const categoryItemsTransformer = (
  data: TCategoryItem[]
): TCategoryItem[] => data;

export const loggedUserTransformer = (data: TUser[]): TUser[] => data;
