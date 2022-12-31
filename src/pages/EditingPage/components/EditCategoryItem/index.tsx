import React, { useState, FC, useEffect, BaseSyntheticEvent } from "react";
import { useMutation } from "react-query";
import { Button, Form, Header, Icon, Modal, TextArea } from "semantic-ui-react";
import { TCategory, TCategoryItem } from "../../../../interfaces";
import { putItemService } from "../../../../services";

const EditCategoryItem: FC<{
  onTogglePopup: (isOpen: boolean) => void;
  actions: (item: TCategoryItem) => void;
  itemCategory: TCategory;
  itemData: TCategoryItem;
}> = (props: {
  onTogglePopup: (isOpen: boolean) => void;
  actions: (item: TCategoryItem) => void;
  itemCategory: TCategory;
  itemData: TCategoryItem;
}) => {
  const { onTogglePopup, actions, itemCategory, itemData } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [editItemData, setEditItemData] = useState<TCategoryItem>({
    image: "",
    id: 0,
    name: "",
    description: "",
    price: 0,
    categoryId: 0,
  });

  useEffect(() => {
    debugger;
    if (itemData && itemData.id !== 0) {
      setEditItemData(itemData);
    }
  }, [itemData]);

  const { mutate } = useMutation<
    TCategoryItem,
    unknown,
    {
      itemId: number;
      itemImage: string;
      itemName: string;
      itemPrice: number;
      itemDescription: string;
      itemCategory: number;
    }
  >(
    ({
      itemId: id,
      itemImage: image,
      itemName: name,
      itemPrice: price,
      itemDescription: description,
      itemCategory: categoryId,
    }) =>
      putItemService({
        itemId: id,
        itemImage: image,
        itemName: name,
        itemPrice: price,
        itemDescription: description,
        itemCategory: categoryId,
      }),
    {
      onSuccess: (data: TCategoryItem) => {
        actions(data);
      },
      onError: (error) => {
        alert(error);
      },
    }
  );

  const handleChange = (e: BaseSyntheticEvent) => {
    setEditItemData({
      ...editItemData,
      [e.target.name]: e.target.value,
    } as TCategoryItem);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    mutate({
      itemId: editItemData.id,
      itemImage: editItemData.image,
      itemName: editItemData.name,
      itemPrice: editItemData.price,
      itemDescription: editItemData.description,
      itemCategory: editItemData.categoryId,
    });

    onTogglePopup(false);
    setIsSubmitting(false);
  };

  return (
    <>
      <Header content={`Edit ${editItemData.name} Item`} />
      <Modal.Content>
        <Form size="large" onSubmit={handleSubmit}>
          <Form.Input
            required
            fluid
            label="Item Name"
            placeholder="item name"
            name="name"
            value={editItemData.name}
            onChange={handleChange}
          />
          <Form.Input
            required
            fluid
            label="Item Price"
            placeholder="item price"
            name="price"
            value={editItemData.price}
            onChange={handleChange}
          />
          <Form.Field
            required
            control={TextArea}
            label="Item Description"
            placeholder="Item description"
            name="description"
            value={editItemData.description}
            onChange={handleChange}
          />
          <div style={{ display: "flex", justifyContent: "end" }}>
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

export default EditCategoryItem;
