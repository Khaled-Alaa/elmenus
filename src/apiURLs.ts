const baseURL = process.env.REACT_APP_API_BASE_URL;
export const urls = {
  categories: `${baseURL}/categories`,

  categoryItems: (categoryId: number) =>
    `${baseURL}/items/?categoryId=${categoryId}`,

  user: (name: string, password: string) =>
    `${baseURL}/users/?username=${name}&password=${password}`,

  addCategory: `${baseURL}/categories`,

  addItem: `${baseURL}/items`,

  deleteItem: (itemId: number) => `${baseURL}/items/${itemId}`,

  deleteCategory: (categoryId: number) => `${baseURL}/categories/${categoryId}`,

  updateItem: (itemId: number) => `${baseURL}/items/${itemId}`,

  updateCategory: (categoryId: number) => `${baseURL}/categories/${categoryId}`,
};
