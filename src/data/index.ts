import { AxiosResponse } from "axios";
import { urls } from "../apiURLs";
import httpClient from "../helpers/httpClient";
import { TCategory } from "../interfaces";

export const getCategoriesData = (): Promise<AxiosResponse<TCategory>> => {
  return httpClient.get<TCategory>(urls.categories);
};
