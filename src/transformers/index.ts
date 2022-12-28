import { TCategory, TCategoryItem } from "../interfaces";

export const categoryTransformer = (data: TCategory[]): TCategory[] => data;

export const categoryItemsTransformer = (
  data: TCategoryItem[]
): TCategoryItem[] => data;
