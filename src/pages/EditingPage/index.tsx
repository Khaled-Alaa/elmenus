import { FC, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Grid, Item, Header, Icon, Container } from "semantic-ui-react";
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
import EditCategoryItem from "./components/EditCategoryItem";
import ModifyingMenu from "./components/ModifyingMenu";
import ModifyingSideBar from "./components/ModifyingSideBar";

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
      onError: (error: Error) => alert(error.message),
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
    console.log("add category");
    setAddCategoryPopupOpen(true);
  };

  const handleAddNewCategory = (category: TCategory) => {
    setCategories([...categories, category]);
  };

  const handleEditCategory = (category: TCategory) => {
    console.log("edited category", category);
  };

  const { mutate: deleteCategory } = useMutation<
    unknown,
    unknown,
    { categoryId: number }
  >(({ categoryId: idOfCategory }) => deleteCategoryService(idOfCategory), {
    onSuccess: (_, variables) => {
      const deletedCategoryIndex = categories.findIndex(
        (category) => category.id === variables.categoryId
      );
      const cloneCategories = [...categories];
      cloneCategories.splice(deletedCategoryIndex, 1);
      setCategories(cloneCategories);
    },
  });

  const handleDeleteCategory = (category: TCategory) => {
    console.log("deleted category", category);
    deleteCategory({
      categoryId: category.id,
    });
  };

  ////////////////////////////////////////////////////////////////
  const { data: categoryItemsData } = useQuery(
    ["categoryItems", selectedCategory.id],
    () => getCategoryItemsService(selectedCategory.id),
    {
      retry: false,
      onSuccess: (data) => {
        setCategoryItems(data);
      },
      onError: (error: Error) => alert(error.message),
    }
  );

  const handleAddItem = (categoryId: number) => {
    console.log("add item in ", categoryId);
    setPopupOpen(true);
  };

  const handleAddNewItem = (categoryItem: TCategoryItem) => {
    debugger;
    setCategoryItems([...categoryItems, categoryItem]);
  };

  const handleEditExistItem = (categoryItem: TCategoryItem) => {
    const cloneCategoryItems = [...categoryItems];
    const editedItemIndex = categoryItems.findIndex(
      (oldCategoryItem) => oldCategoryItem.id === categoryItem.id
    );
    cloneCategoryItems[editedItemIndex]=categoryItem
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
    console.log("edited item", item);
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
      },
    }
  );

  const handleDeleteItem = (item: TCategoryItem) => {
    console.log("deleted item", item);
    mutate({
      itemId: item.id,
    });
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
              getDeletedCategory={handleDeleteItem}
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
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
              <ModifyingSideBar
                data={categories}
                selectedCategory={selectedCategory}
                getSelectedCategory={handleSelectedCategory}
                getEditedCategory={handleEditCategory}
                getDeletedCategory={handleDeleteCategory}
              />
            </Grid.Column>
            <Grid.Column width={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
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
              {renderItems()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <AddCategory
          isOpen={isAddCategoryPopupOpen}
          onTogglePopup={handleAddCategoryPopup}
          actions={handleAddNewCategory}
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
      </Container>
    </>
  );
};

export default EditingPage;
