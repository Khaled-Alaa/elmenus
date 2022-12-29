import { FC } from "react";
import { Icon, Menu } from "semantic-ui-react";
import { TCategory } from "../../../../interfaces";

const ModifyingSideBar: FC<{
  data: TCategory[];
  selectedCategory: TCategory;
  getSelectedCategory: (category: TCategory) => void;
  getEditedCategory: (category: TCategory) => void;
  getDeletedCategory: (category: TCategory) => void;
}> = (props: {
  data: TCategory[];
  selectedCategory: TCategory;
  getSelectedCategory: (category: TCategory) => void;
  getEditedCategory: (category: TCategory) => void;
  getDeletedCategory: (category: TCategory) => void;
}) => {
  const {
    getSelectedCategory,
    data,
    selectedCategory,
    getEditedCategory,
    getDeletedCategory,
  } = props;

  const renderCategories = (categories: TCategory[]) => {
    return categories.map((category) => (
      <div style={{ display: "flex" }}>
        <Menu.Item
          key={category.id}
          name={category.name}
          active={selectedCategory.id === category.id}
          onClick={() => getSelectedCategory(category)}
        />
        <Icon
          name="pencil alternate"
          onClick={() => getEditedCategory(category)}
          circular
          inverted
          color="blue"
        />
        <Icon
          name="trash alternate outline"
          onClick={() => getDeletedCategory(category)}
          circular
          inverted
          color="red"
        />
      </div>
    ));
  };

  return (
    <Menu fluid vertical tabular>
      {renderCategories(data)}
    </Menu>
  );
};

export default ModifyingSideBar;
