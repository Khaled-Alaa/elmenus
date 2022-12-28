import { FC } from "react";
import { Menu } from "semantic-ui-react";
import { TCategory } from "../../../../interfaces";

const SideBar: FC<{
  data: TCategory[];
  selectedCategory: TCategory;
  getSelectedCategory: (category: TCategory) => void;
}> = (props: {
  data: TCategory[];
  selectedCategory: TCategory;
  getSelectedCategory: (category: TCategory) => void;
}) => {
  const { getSelectedCategory, data, selectedCategory } = props;

  const renderCategories = (categories: TCategory[]) => {
    return categories.map((category) => (
      <Menu.Item
        key={category.id}
        name={category.name}
        active={selectedCategory.id === category.id}
        onClick={() => getSelectedCategory(category)}
      />
    ));
  };

  return (
    <Menu fluid vertical tabular>
      {renderCategories(data)}
    </Menu>
  );
};

export default SideBar;
