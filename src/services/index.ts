import { getCategoriesData, getCategoryItemsData } from "../data";
import { categoryItemsTransformer, categoryTransformer } from "../transformers";

export const getCategoriesService = async () => {
  try {
    const response = await getCategoriesData();
    return categoryTransformer(response.data);
  } catch (error) {
    throw error;
  }
};

export const getCategoryItemsService = async (categoryId: number) => {
  try {
    const response = await getCategoryItemsData(categoryId);
    return categoryItemsTransformer(response.data);
  } catch (error) {
    throw error;
  }
};
