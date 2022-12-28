import { AxiosResponse } from "axios";
import { urls } from "../apiURLs";
import httpClient from "../helpers/httpClient";
import { TCategory, TCategoryItem } from "../interfaces";

export const getCategoriesData = (): Promise<AxiosResponse<TCategory[]>> => {
  return httpClient.get<TCategory[]>(urls.categories);
};

export const getCategoryItemsData = (
  categoryId: number
): Promise<AxiosResponse<TCategoryItem[]>> => {
  return httpClient.get<TCategoryItem[]>(urls.categoryItems(categoryId));
};
