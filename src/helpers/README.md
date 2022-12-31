# HTTPClient
A helper for crating XHR requests via Axios

## Avaliable methods 
```js
import httpClient from "../helpers/httpClient";
import { AxiosResponse } from "axios";
import { urls } from "../apiURLs";


export const getData = (
  name: string,
  password: string
): Promise<AxiosResponse<TData>> => {
  return httpClient.get<TData[]>(urls.user(name, password));
};


export const postData = ({
  name,
}: {
  name: string;
}): Promise<AxiosResponse<TData>> => {
  return httpClient.post<TData>(urls.addCategory, {
    name,
  });
};


export const deleteData = (id: number): Promise<AxiosResponse> => {
  return httpClient.delete<TData>(urls.deleteItem(id));
};


export const putData = ({
  id,
  name,
}: {
  id: number;
  name: string;
}): Promise<AxiosResponse<TData>> => {
  return httpClient.put<TData>(urls.updateCategory(id), {
    name,
  });
};

```