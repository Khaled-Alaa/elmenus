import {
  deleteCategoryData,
  deleteItemData,
  getCategoriesData,
  getCategoryItemsData,
  getLoggedUserData,
  postNewCategoryData,
  postNewItemData,
  putItemData,
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

export const postNewCategoryService = async ({
  categoryName,
  categoryDescription,
}: {
  categoryName: string;
  categoryDescription: string;
}) => {
  try {
    const response = await postNewCategoryData({
      categoryName,
      categoryDescription,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postNewItemService = async ({
  itemImage,
  itemName,
  itemPrice,
  itemDescription,
  itemCategory,
}: {
  itemImage: string;
  itemName: string;
  itemPrice: number;
  itemDescription: string;
  itemCategory: number;
}) => {
  try {
    const response = await postNewItemData({
      itemImage,
      itemName,
      itemPrice,
      itemDescription,
      itemCategory,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteItemService = async (itemId: number) => {
  try {
    const response = await deleteItemData(itemId);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCategoryService = async (categoryId: number) => {
  try {
    const response = await deleteCategoryData(categoryId);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const putItemService = async ({
  itemId,
  itemImage,
  itemName,
  itemPrice,
  itemDescription,
  itemCategory,
}: {
  itemId: number;
  itemImage: string;
  itemName: string;
  itemPrice: number;
  itemDescription: string;
  itemCategory: number;
}) => {
  try {
    const response = await putItemData({
      itemId,
      itemImage,
      itemName,
      itemPrice,
      itemDescription,
      itemCategory,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
