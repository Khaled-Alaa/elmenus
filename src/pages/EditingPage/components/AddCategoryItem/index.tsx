import React, { useState, FC, BaseSyntheticEvent } from "react";
import { useMutation } from "react-query";
import { Button, Form, Header, Icon, Modal, TextArea } from "semantic-ui-react";
import { TCategory, TCategoryItem } from "../../../../interfaces";
import { postNewItemService } from "../../../../services";
import "./styles.scss";

const AddCategoryItem: FC<{
  onTogglePopup: (isOpen: boolean) => void;
  actions: (item: TCategoryItem) => void;
  itemCategory: TCategory;
}> = (props: {
  onTogglePopup: (isOpen: boolean) => void;
  actions: (item: TCategoryItem) => void;
  itemCategory: TCategory;
}) => {
  const { onTogglePopup, actions, itemCategory } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate } = useMutation<
    TCategoryItem,
    unknown,
    {
      itemImage: string;
      itemName: string;
      itemPrice: number;
      itemDescription: string;
      itemCategory: number;
    }
  >(
    ({
      itemImage: image,
      itemName: name,
      itemPrice: price,
      itemDescription: description,
      itemCategory: categoryId,
    }) =>
      postNewItemService({
        itemImage: image,
        itemName: name,
        itemPrice: price,
        itemDescription: description,
        itemCategory: categoryId,
      }),
    {
      onSuccess: (data: TCategoryItem) => {
        debugger;
        actions(data);
      },
      onError: (error) => {
        alert(error);
      },
    }
  );

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    mutate({
      itemImage:
        "https://i.ibb.co/mXhgNPp/dd9dc9d83423bc037b511d73b29e6b80.jpg",
      itemName: e.target.itemName.value,
      itemPrice: e.target.itemPrice.value,
      itemDescription: e.target.itemDescription.value,
      itemCategory: itemCategory.id,
    });

    onTogglePopup(false);
    setIsSubmitting(false);
  };

  return (
    <>
      <Header content="Add New Category" />
      <Modal.Content>
        <Form size="large" onSubmit={handleSubmit}>
          <Form.Input
            required
            fluid
            label="Item Name"
            placeholder="item name"
            name="itemName"
          />
          <Form.Input
            required
            fluid
            label="Item Price"
            placeholder="item price"
            name="itemPrice"
          />
          <Form.Field
            required
            control={TextArea}
            label="Item Description"
            placeholder="Item description"
            name="itemDescription"
          />
          <div className="add-category-item-form__actions-container">
            <Button
              type="button"
              color="red"
              onClick={() => onTogglePopup(false)}
            >
              <Icon name="remove" /> No
            </Button>
            <Button type="submit" disabled={isSubmitting} color="green">
              <Icon name="checkmark" /> Yes
            </Button>
          </div>
        </Form>
      </Modal.Content>
    </>
  );
};

export default AddCategoryItem;
