import { getCategoriesData } from "../data";
import { categoryTransformer } from "../transformers";

export const getCategoriesService = async () => {
  try {
    const response = await getCategoriesData();
    return categoryTransformer(response.data);
  } catch (error) {
    throw error;
  }
};
