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

export const postNewCategory = ({
  categoryName,
  categoryDescription,
}: {
  categoryName: string;
  categoryDescription: string;
}): Promise<AxiosResponse<TCategory>> => {
  return httpClient.post<TCategory>(urls.addCategory, {
    name: categoryName,
    description: categoryDescription,
  });
};

export const postNewItem = ({
  itemImage,
  itemName,
  itemPrice,
  itemDescription,
  itemCategory,
}: {
  itemImage: string;
  itemName: string;
  itemPrice: number;
  itemDescription: string;
  itemCategory: number;
}): Promise<AxiosResponse<TCategoryItem>> => {
  return httpClient.post<TCategoryItem>(urls.addItem, {
    image: itemImage,
    name: itemName,
    price: itemPrice,
    description: itemDescription,
    categoryId: itemCategory,
  });
};
