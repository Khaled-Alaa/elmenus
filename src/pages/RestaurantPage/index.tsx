import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Grid, Item } from "semantic-ui-react";
import Header from "../../components/Header";
import { TCategory } from "../../interfaces";
import { getCategoriesService, getCategoryItemsService } from "../../services";
import MenuItem from "./components/Menu";
import SideBar from "./components/SideBar";

const RestaurantPage: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<TCategory>({
    id: 0,
    name: "",
    description: "",
  });

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

  const { data: categoryItemsData } = useQuery(
    ["categoryItems", selectedCategory.id],
    () => getCategoryItemsService(selectedCategory.id),
    {
      retry: 0,
      onError: (error: Error) => alert(error.message),
    }
  );

  const renderItems = () => {
    if (categoryItemsData && categoryItemsData.length > 0) {
      return (
        <Item.Group>
          {categoryItemsData.map((item) => (
            <MenuItem key={item.id} data={item} />
          ))}
        </Item.Group>
      );
    }
  };
  return (
    <>
      <Header />
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={4}>
            <SideBar
              data={categries}
              selectedCategory={selectedCategory}
              getSelectedCategory={handleSelectedCategory}
            />
          </Grid.Column>
          <Grid.Column width={12}>{renderItems()}</Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default RestaurantPage;
