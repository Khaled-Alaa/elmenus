import { FC } from "react";
import { Item, Label, Container, Icon } from "semantic-ui-react";
import { TCategoryItem } from "../../../../interfaces";
import MenuItem from "../../../RestaurantPage/components/Menu";

const ModifyingMenu: FC<{
  data: TCategoryItem;
  getEditedItem: (item: TCategoryItem) => void;
  getDeletedCategory: (item: TCategoryItem) => void;
}> = (props: {
  data: TCategoryItem;
  getEditedItem: (item: TCategoryItem) => void;
  getDeletedCategory: (item: TCategoryItem) => void;
}) => {
  const { data, getEditedItem, getDeletedCategory } = props;

  return (
    <>
      <Icon
        name="pencil alternate"
        onClick={() => getEditedItem(data)}
        circular
        inverted
        color="blue"
      />
      <Icon
        name="trash alternate outline"
        onClick={() => getDeletedCategory(data)}
        circular
        inverted
        color="red"
      />
      <MenuItem key={data.id} data={data} />
    </>
  );
};

export default ModifyingMenu;
