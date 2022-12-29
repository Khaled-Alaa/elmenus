import { AxiosResponse } from "axios";
import { urls } from "../apiURLs";
import httpClient from "../helpers/httpClient";
import { TCategory, TCategoryItem, TUser } from "../interfaces";

export const getCategoriesData = (): Promise<AxiosResponse<TCategory[]>> => {
  return httpClient.get<TCategory[]>(urls.categories);
};

export const getCategoryItemsData = (
  categoryId: number
): Promise<AxiosResponse<TCategoryItem[]>> => {
  return httpClient.get<TCategoryItem[]>(urls.categoryItems(categoryId));
};

export const getLoggedUserData = (
  name: string,
  password: string
): Promise<AxiosResponse<TUser[]>> => {
  return httpClient.get<TUser[]>(urls.user(name, password));
};
