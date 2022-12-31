import { FC } from "react";
import { Icon, Segment } from "semantic-ui-react";
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
    <Segment>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Icon
          name="pencil alternate"
          onClick={() => getEditedItem(data)}
          circular
          inverted
          color="blue"
          link
        />
        <Icon
          name="trash alternate outline"
          onClick={() => getDeletedCategory(data)}
          circular
          inverted
          color="red"
          link
        />
      </div>
      <MenuItem key={data.id} data={data} />
    </Segment>
  );
};

export default ModifyingMenu;
