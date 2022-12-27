import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const httpClient = {
  get: <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => axios.get<T, AxiosResponse<T>>(url, config),
  post: <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => axios.post<T, AxiosResponse<T>>(url, config),
  delete: <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> =>
    axios.delete<T, AxiosResponse<T>>(url, config),
  put: <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => axios.put<T, AxiosResponse<T>>(url, config),
};

export default httpClient;
