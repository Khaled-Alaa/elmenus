export const urls = {
  categories: "http://localhost:8000/categories",

  categoryItems: (categoryId: number) =>
    `http://localhost:8000/items/?categoryId=${categoryId}`,

  user: (name: string, password: string) =>
    `http://localhost:8000/users/?username=${name}&password=${password}`,

  addCategory: `http://localhost:8000/categories`,

  addItem: `http://localhost:8000/items`,

  deleteItem: (itemId: number) => `http://localhost:8000/items/${itemId}`,

  deleteCategory: (categoryId: number) =>
    `http://localhost:8000/categories/${categoryId}`,

  updateItem: (itemId: number) => `http://localhost:8000/items/${itemId}`,

  updateCategory: (categoryId: number) =>
    `http://localhost:8000/categories/${categoryId}`,
};
