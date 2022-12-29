import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Grid, Item, Header, Icon } from "semantic-ui-react";
import MainHeader from "../../components/Header";
import Popup from "../../components/Popup";
import { TCategory, TCategoryItem } from "../../interfaces";
import { getCategoriesService, getCategoryItemsService } from "../../services";
import ModifyingMenu from "./components/ModifyingMenu";
import ModifyingSideBar from "./components/ModifyingSideBar";

const EditingPage: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<TCategory>({
    id: 0,
    name: "",
  });
  const [isPopupOpen, setPopupOpen] = useState<boolean>(false);

  const { data: categoriesData } = useQuery(
    ["categories"],
    getCategoriesService,
    {
      retry: 0,
      onError: (error: Error) => alert(error.message),
    }
  );

  useEffect(() => {
    if (categoriesData && categoriesData.length > 0) {
      setSelectedCategory(categoriesData[0]);
    }
  }, [categoriesData]);

  const categries = categoriesData || [];
  const handleSelectedCategory = (category: TCategory) => {
    setSelectedCategory(category);
  };

  const handleAddCategory = () => {
    console.log("add category");
  };

  const handleEditCategory = (category: TCategory) => {
    console.log("edited category", category);
  };

  const handleDeleteCategory = (category: TCategory) => {
    console.log("deleted category", category);
  };

  ////////////////////////////////////////////////////////////////
  const { data: categoryItemsData } = useQuery(
    ["categoryItems", selectedCategory.id],
    () => getCategoryItemsService(selectedCategory.id),
    {
      retry: 0,
      onError: (error: Error) => alert(error.message),
    }
  );

  const handleAddItem = (categoryId: number) => {
    console.log("add item in ", categoryId);
    setPopupOpen(true);
  };

  const handleEditItem = (item: TCategoryItem) => {
    console.log("edited item", item);
  };

  const handleDeleteItem = (item: TCategoryItem) => {
    console.log("deleted item", item);
  };
  const handlePopup = (isOpen: boolean) => {
    setPopupOpen(isOpen);
  };
  const renderItems = () => {
    if (categoryItemsData && categoryItemsData.length > 0) {
      return (
        <Item.Group>
          {categoryItemsData.map((item) => (
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
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={4}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Header as={"h2"}>Menu Categries</Header>
              <Icon
                name="add"
                onClick={() => handleAddCategory()}
                circular
                inverted
                color="green"
              />
            </div>
            <ModifyingSideBar
              data={categries}
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
                onClick={() => handleAddItem(selectedCategory.id)}
                circular
                inverted
                color="green"
              />
            </div>
            {renderItems()}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Popup isOpen={isPopupOpen} setpopup={handlePopup} />
    </>
  );
};

export default EditingPage;
