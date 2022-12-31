import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Container, Grid, Header, Item, Segment } from "semantic-ui-react";
import EmptyState from "../../components/EmptyState";
import MainHeader from "../../components/Header";
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
            <Segment key={item.id}>
              <MenuItem data={item} />
            </Segment>
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
              <Header as={"h2"}>Menu Categories</Header>
              {categoriesData && categoriesData.length > 0 ? (
                <SideBar
                  data={categoriesData || []}
                  selectedCategory={selectedCategory}
                  getSelectedCategory={handleSelectedCategory}
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
              <Header as={"h2"}>{selectedCategory.name} Items</Header>
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
      </Container>
    </>
  );
};

export default RestaurantPage;
