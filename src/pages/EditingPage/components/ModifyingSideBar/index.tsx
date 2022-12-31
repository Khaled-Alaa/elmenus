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
        <Menu.Item
          key={category.id}
          name={category.name}
          active={selectedCategory.id === category.id}
          onClick={() => getSelectedCategory(category)}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {category.name}
            <label>
              <Icon
                name="pencil alternate"
                onClick={() => getEditedCategory(category)}
                circular
                inverted
                color="blue"
                link
              />
              <Icon
                name="trash alternate outline"
                onClick={() => getDeletedCategory(category)}
                circular
                inverted
                color="red"
                link
              />
            </label>
          </div>
        </Menu.Item>
    ));
  };

  return (
    <Menu fluid secondary vertical>
      {renderCategories(data)}
    </Menu>
  );
};

export default ModifyingSideBar;
