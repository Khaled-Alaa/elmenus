import { BaseSyntheticEvent, FC } from "react";
import { Icon, Segment } from "semantic-ui-react";
import { TCategoryItem } from "../../../../interfaces";
import MenuItem from "../../../RestaurantPage/components/Menu";
import "./styles.scss";

const ModifyingMenu: FC<{
  data: TCategoryItem;
  getEditedItem: (item: TCategoryItem) => void;
  getDeletedItem: (item: TCategoryItem) => void;
}> = (props: {
  data: TCategoryItem;
  getEditedItem: (item: TCategoryItem) => void;
  getDeletedItem: (item: TCategoryItem) => void;
}) => {
  const { data, getEditedItem, getDeletedItem } = props;

  return (
    <Segment>
      <div
        className="modify-category-item-buttons__actions-container"
      >
        <Icon
          name="pencil alternate"
          onClick={(e: BaseSyntheticEvent) => {
            getEditedItem(data);
            e.stopPropagation();
          }}
          circular
          inverted
          color="blue"
          link
        />
        <Icon
          name="trash alternate outline"
          onClick={(e: BaseSyntheticEvent) => {
            getDeletedItem(data);
            e.stopPropagation();
          }}
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
