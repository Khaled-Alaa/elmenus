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
import AddCategory from "./components/AddCategory";
import AddCategoryItem from "./components/AddCategoryItem";
import EditCategory from "./components/EditCategory";
import EditCategoryItem from "./components/EditCategoryItem";
import ModifyingMenu from "./components/ModifyingMenu";
import ModifyingSideBar from "./components/ModifyingSideBar";
import "./styles.scss";

const EditingPage: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<TCategory>({
    id: 0,
    name: "",
    description: "",
  });
  const [isAddCategoryPopupOpen, setAddCategoryPopupOpen] =
    useState<boolean>(false);
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
  const [isPopupOpen, setPopupOpen] = useState<boolean>(false);
  const [openAddItemFlow, setAddItemFlow] = useState<boolean>(false);

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

  useEffect(() => {
    if (categoriesData && categoriesData.length > 0) {
      setSelectedCategory(categoriesData[0]);
    }
  }, [categoriesData]);

  const handleSelectedCategory = (category: TCategory) => {
    setSelectedCategory(category);
  };

  const handleAddCategory = () => {
    setAddCategoryPopupOpen(true);
  };

  const handleAddNewCategory = (category: TCategory) => {
    setCategories([...categories, category]);
  };

  const [editCategory, setEditCategory] = useState<TCategory>({
    id: 0,
    name: "",
    description: "",
  });
  const [editCategoryFlow, setEditCategoryFlow] = useState<boolean>(false);
  const [isEditCategoryPopupOpen, setEditCategoryPopupOpen] =
    useState<boolean>(false);

  const handleEditCategoryPopup = (isOpen: boolean) => {
    setEditCategoryPopupOpen(isOpen);
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
    setEditCategoryPopupOpen(true);
    setEditCategory(category);
    setEditCategoryFlow(true);
  };

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
  //
  const [deleteCategory, setDeleteCategory] = useState<TCategory>({
    id: 0,
    name: "",
    description: "",
  });
  const [isDeleteCategoryPopupOpen, setDeleteCategoryPopupOpen] =
    useState<boolean>(false);

  const handleDeleteCategory = (category: TCategory) => {
    setDeleteCategoryPopupOpen(true);
    setDeleteCategory(category);
  };
  const handleDeleteExistCategory = (category: TCategory) => {
    mutatedeleteCategory({
      categoryId: category.id,
    });
    setDeleteCategoryPopupOpen(false);
  };

  ////////////////////////////////////////////////////////////////
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

  const handleAddItem = (categoryId: number) => {
    setPopupOpen(true);
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

  const [editItem, setEditItem] = useState<TCategoryItem>({
    image: "",
    id: 0,
    name: "",
    description: "",
    price: 0,
    categoryId: 0,
  });
  const [editItemFlow, setEditItemFlow] = useState<boolean>(false);
  const [isEditItemPopupOpen, setEditItemPopupOpen] = useState<boolean>(false);

  const handleEditItem = (item: TCategoryItem) => {
    setEditItemPopupOpen(true);

    setEditItem(item);
    setEditItemFlow(true);
  };

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

  //

  const [deleteItem, setDeleteItem] = useState<TCategoryItem>({
    image: "",
    id: 0,
    name: "",
    description: "",
    price: 0,
    categoryId: 0,
  });
  const [isDeleteItemPopupOpen, setDeleteItemPopupOpen] =
    useState<boolean>(false);

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

  const handleAddCategoryPopup = (isOpen: boolean) => {
    setAddCategoryPopupOpen(isOpen);
  };

  const handlePopup = (isOpen: boolean) => {
    setPopupOpen(isOpen);
  };

  const handleEditItemPopup = (isOpen: boolean) => {
    setEditItemPopupOpen(isOpen);
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
                  onClick={() => handleAddCategory()}
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
                    handleAddItem(selectedCategory.id);
                    setAddItemFlow(true);
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
        <AddCategory
          isOpen={isAddCategoryPopupOpen}
          onTogglePopup={handleAddCategoryPopup}
          actions={handleAddNewCategory}
        />
        <EditCategory
          isOpen={isEditCategoryPopupOpen}
          onTogglePopup={handleEditCategoryPopup}
          actions={handleEditExistCategory}
          categoryData={editCategory}
        />
        <Popup isOpen={isPopupOpen} onTogglePopup={handlePopup}>
          {openAddItemFlow ? (
            <AddCategoryItem
              actions={handleAddNewItem}
              onTogglePopup={handlePopup}
              itemCategory={selectedCategory}
            />
          ) : (
            <></>
          )}
        </Popup>
        <Popup isOpen={isEditItemPopupOpen} onTogglePopup={handleEditItemPopup}>
          {editItemFlow ? (
            <EditCategoryItem
              actions={handleEditExistItem}
              onTogglePopup={handleEditItemPopup}
              itemCategory={selectedCategory}
              itemData={editItem}
            />
          ) : (
            <></>
          )}
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
