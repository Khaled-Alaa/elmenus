import { FC, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  Grid,
  Item,
  Header,
  Icon,
  Container,
  Confirm,
} from "semantic-ui-react";
import { toast } from "react-toastify";

import EmptyState from "../../components/EmptyState";
import MainHeader from "../../components/Header";
import Popup from "../../components/Popup";
import { TCategory, TCategoryItem } from "../../interfaces";
import {
  deleteCategoryService,
  deleteItemService,
  getCategoriesService,
  getCategoryItemsService,
} from "../../services";
import AddEditCategoryForm from "./components/AddEditCategory";
import AddEditItemForm from "./components/AddEditItem";
import ModifyingMenu from "./components/ModifyingMenu";
import ModifyingSideBar from "./components/ModifyingSideBar";
import "./styles.scss";

const EditingPage: FC = () => {
  //State
  const [selectedCategory, setSelectedCategory] = useState<TCategory>({
    id: 0,
    name: "",
    description: "",
  });
  const [categories, setCategories] = useState<TCategory[]>([
    {
      id: 0,
      name: "",
      description: "",
    },
  ]);
  const [categoryItems, setCategoryItems] = useState<TCategoryItem[]>([
    {
      image: "",
      id: 0,
      name: "",
      description: "",
      price: 0,
      categoryId: 0,
    },
  ]);

  const [editCategory, setEditCategory] = useState<TCategory>({
    id: 0,
    name: "",
    description: "",
  });
  const [editItem, setEditItem] = useState<TCategoryItem>({
    image: "",
    id: 0,
    name: "",
    description: "",
    price: 0,
    categoryId: 0,
  });

  const [deleteCategory, setDeleteCategory] = useState<TCategory>({
    id: 0,
    name: "",
    description: "",
  });
  const [deleteItem, setDeleteItem] = useState<TCategoryItem>({
    image: "",
    id: 0,
    name: "",
    description: "",
    price: 0,
    categoryId: 0,
  });

  const [categoryMode, setCategoryMode] = useState<string>("");
  const [itemMode, setItemMode] = useState<string>("");

  const [isItemPopupOpen, setItemPopupOpen] = useState<boolean>(false);
  const [isCategoryPopupOpen, setCategoryPopupOpen] = useState<boolean>(false);
  const [isDeleteItemPopupOpen, setDeleteItemPopupOpen] =
    useState<boolean>(false);
  const [isDeleteCategoryPopupOpen, setDeleteCategoryPopupOpen] =
    useState<boolean>(false);

  //React Query
  const { data: categoriesData } = useQuery(
    ["categories"],
    getCategoriesService,
    {
      retry: false,
      onSuccess: (data) => {
        setCategories(data);
      },
      onError: (error: Error) => {
        toast.error("Can't get categories");
      },
    }
  );

  const { mutate: mutatedeleteCategory } = useMutation<
    unknown,
    unknown,
    { categoryId: number }
  >(({ categoryId }) => deleteCategoryService(categoryId), {
    onSuccess: (_, variables) => {
      const deletedCategoryIndex = categories.findIndex(
        (category) => category.id === variables.categoryId
      );
      const cloneCategories = [...categories];
      cloneCategories.splice(deletedCategoryIndex, 1);
      setCategories(cloneCategories);
      toast.success("Category deleted successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Can't delete category");
    },
  });

  useQuery(
    ["categoryItems", selectedCategory.id],
    () => getCategoryItemsService(selectedCategory.id),
    {
      retry: false,
      onSuccess: (data) => {
        setCategoryItems(data);
      },
      onError: (error: Error) => {
        toast.error("Can't category items");
      },
    }
  );

  const { mutate } = useMutation<unknown, unknown, { itemId: number }>(
    ({ itemId: categoryitemId }) => deleteItemService(categoryitemId),
    {
      onSuccess: (_, variables) => {
        const deletedItemIndex = categoryItems.findIndex(
          (categoryItem) => categoryItem.id === variables.itemId
        );
        const cloneCategoryItems = [...categoryItems];
        cloneCategoryItems.splice(deletedItemIndex, 1);
        setCategoryItems(cloneCategoryItems);
        toast.success("Item deleted successfully");
      },
      onError: (error) => {
        console.error(error);
        toast.error("Can't delete item");
      },
    }
  );

  //React Life Cycle
  useEffect(() => {
    if (categoriesData && categoriesData.length > 0) {
      setSelectedCategory(categoriesData[0]);
    }
  }, [categoriesData]);

  //Handlers
  const handleSelectedCategory = (category: TCategory) => {
    setSelectedCategory(category);
  };

  const handleAddNewCategory = (category: TCategory) => {
    setCategories([...categories, category]);
  };

  const handleCategoryPopup = (isOpen: boolean) => {
    setCategoryPopupOpen(isOpen);
  };

  const handleEditExistCategory = (category: TCategory) => {
    const cloneCategory = [...categories];
    const editedCategoryIndex = categories.findIndex(
      (oldCategory) => oldCategory.id === category.id
    );
    cloneCategory[editedCategoryIndex] = category;
    setCategories(cloneCategory);
  };

  const handleEditCategory = (category: TCategory) => {
    setCategoryPopupOpen(true);
    setEditCategory(category);
    setCategoryMode("edit");
  };

  const handleDeleteCategory = (category: TCategory) => {
    setDeleteCategoryPopupOpen(true);
    setDeleteCategory(category);
  };
  const handleDeleteExistCategory = (category: TCategory) => {
    mutatedeleteCategory({
      categoryId: category.id,
    });
    setDeleteCategoryPopupOpen(false);
    setSelectedCategory(categories[0]);
  };

  const handleAddNewItem = (categoryItem: TCategoryItem) => {
    setCategoryItems([...categoryItems, categoryItem]);
  };

  const handleEditExistItem = (categoryItem: TCategoryItem) => {
    const cloneCategoryItems = [...categoryItems];
    const editedItemIndex = categoryItems.findIndex(
      (oldCategoryItem) => oldCategoryItem.id === categoryItem.id
    );
    cloneCategoryItems[editedItemIndex] = categoryItem;
    setCategoryItems(cloneCategoryItems);
  };

  const handleEditItem = (item: TCategoryItem) => {
    setItemPopupOpen(true);
    setEditItem(item);
    setItemMode("edit");
  };

  const handleDeleteItem = (item: TCategoryItem) => {
    setDeleteItemPopupOpen(true);
    setDeleteItem(item);
  };

  const handleDeleteExistItem = (item: TCategoryItem) => {
    mutate({
      itemId: item.id,
    });
    setDeleteItemPopupOpen(false);
  };

  const handleItemPopup = (isOpen: boolean) => {
    setItemPopupOpen(isOpen);
  };

  const renderItems = () => {
    if (categoryItems && categoryItems.length > 0) {
      return (
        <Item.Group>
          {categoryItems.map((item) => (
            <ModifyingMenu
              key={item.id}
              data={item}
              getEditedItem={handleEditItem}
              getDeletedItem={handleDeleteItem}
            />
          ))}
        </Item.Group>
      );
    }
  };

  return (
    <>
      <MainHeader />
      <Container>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={4}>
              <div className="header-container">
                <Header as={"h2"}>Menu Categories</Header>
                <Icon
                  name="add"
                  onClick={() => {
                    setCategoryPopupOpen(true);
                    setCategoryMode("add");
                  }}
                  circular
                  inverted
                  color="green"
                  link
                />
              </div>
              {categories && categories.length > 0 ? (
                <ModifyingSideBar
                  data={categories}
                  selectedCategory={selectedCategory}
                  getSelectedCategory={handleSelectedCategory}
                  getEditedCategory={handleEditCategory}
                  getDeletedCategory={handleDeleteCategory}
                />
              ) : (
                <EmptyState
                  imageSize="small"
                  sectorName="Categories"
                  headerSize="h5"
                />
              )}
            </Grid.Column>
            <Grid.Column width={12}>
              <div className="header-container">
                <Header as={"h2"}>{selectedCategory.name} Items</Header>
                <Icon
                  name="add"
                  onClick={() => {
                    setItemPopupOpen(true);
                    setItemMode("add");
                  }}
                  circular
                  inverted
                  color="green"
                  link
                />
              </div>
              {renderItems() || (
                <EmptyState
                  imageSize="medium"
                  sectorName="Items"
                  headerSize="h2"
                />
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Popup
          isOpen={isCategoryPopupOpen}
          onTogglePopup={handleCategoryPopup}
          header={
            categoryMode === "edit"
              ? `Edit ${editCategory.name} category`
              : "Add New Category"
          }
        >
          <AddEditCategoryForm
            actions={
              categoryMode === "edit"
                ? handleEditExistCategory
                : handleAddNewCategory
            }
            onTogglePopup={handleCategoryPopup}
            categoryData={editCategory}
            categoryMode={categoryMode}
          />
        </Popup>
        <Popup
          isOpen={isItemPopupOpen}
          onTogglePopup={handleItemPopup}
          header={
            itemMode === "edit" ? `Edit ${editItem.name} Item` : "Add New Item"
          }
        >
          <AddEditItemForm
            actions={
              itemMode === "edit" ? handleEditExistItem : handleAddNewItem
            }
            onTogglePopup={handleItemPopup}
            itemCategory={selectedCategory}
            itemData={editItem}
            itemMode={itemMode}
          />
        </Popup>
        <Confirm
          open={isDeleteItemPopupOpen}
          header={`You are going to delete ${deleteItem.name} item`}
          onCancel={() => setDeleteItemPopupOpen(false)}
          onConfirm={() => handleDeleteExistItem(deleteItem)}
          size="tiny"
        />
        <Confirm
          open={isDeleteCategoryPopupOpen}
          header={`You are going to delete ${deleteCategory.name} category`}
          onCancel={() => setDeleteCategoryPopupOpen(false)}
          onConfirm={() => handleDeleteExistCategory(deleteCategory)}
          size="tiny"
        />
      </Container>
    </>
  );
};

export default EditingPage;
