export const urls = {
  categories: "http://localhost:8000/categories",
  categoryItems: (categoryId: number) =>
    `http://localhost:8000/items/?categorId=${categoryId}`,
};
