export const urls = {
  categories: "http://localhost:8000/categories",

  categoryItems: (categoryId: number) =>
    `http://localhost:8000/items/?categorId=${categoryId}`,

  user: (name: string, password: string) =>
    `http://localhost:8000/users/?username=${name}&password=${password}`,

  addCategory: `http://localhost:8000/categories`,
};
