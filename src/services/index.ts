import {
  getCategoriesData,
  getCategoryItemsData,
  getLoggedUserData,
} from "../data";
import {
  categoryItemsTransformer,
  categoryTransformer,
  loggedUserTransformer,
} from "../transformers";

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

export const getUserByNameAndPasswordService = async (
  name: string,
  password: string
) => {
  try {
    // I used the GET method because it is a limitation in JSON.server it should be a POST method but JSON.server will understand it as adding data
    const response = await getLoggedUserData(name, password);
    return loggedUserTransformer(response.data);
  } catch (error) {
    throw error;
  }
};
