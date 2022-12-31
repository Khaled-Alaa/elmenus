import React, { useState, FC, useEffect, BaseSyntheticEvent } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Button, Form, Header, Icon, Modal, TextArea } from "semantic-ui-react";

import { TCategory, TCategoryItem } from "../../../../interfaces";
import { postNewItemService, putItemService } from "../../../../services";
import "./styles.scss";

const AddEditItemForm: FC<{
  onTogglePopup: (isOpen: boolean) => void;
  actions: (item: TCategoryItem) => void;
  itemCategory: TCategory;
  itemData: TCategoryItem;
  itemMode: string;
}> = (props: {
  onTogglePopup: (isOpen: boolean) => void;
  actions: (item: TCategoryItem) => void;
  itemCategory: TCategory;
  itemData: TCategoryItem;
  itemMode: string;
}) => {
  const { onTogglePopup, actions, itemCategory, itemData, itemMode } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [itemDataState, setItemDataState] = useState<TCategoryItem>({
    image: "",
    id: 0,
    name: "",
    description: "",
    price: 0,
    categoryId: 0,
  });

  useEffect(() => {
    if (itemData && itemData.id !== 0 && itemMode === "edit") {
      setItemDataState(itemData);
    }
  }, [itemData, itemMode]);

  const { mutate: addItem } = useMutation<
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
        actions(data);
        toast.success("Item added successfully");
      },
      onError: (error) => {
        console.error(error);
        toast.error("Can't add item");
      },
    }
  );

  const { mutate: updateItem } = useMutation<
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
        toast.success("Item updated successfully");
      },
      onError: (error) => {
        console.error(error);
        toast.error("Can't update item");
      },
    }
  );

  const handleChange = (e: BaseSyntheticEvent) => {
    setItemDataState({
      ...itemDataState,
      [e.target.name]: e.target.value,
    } as TCategoryItem);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (itemMode === "edit") {
      updateItem({
        itemId: itemDataState.id,
        itemImage: itemDataState.image,
        itemName: itemDataState.name,
        itemPrice: itemDataState.price,
        itemDescription: itemDataState.description,
        itemCategory: itemDataState.categoryId,
      });
    } else if (itemMode === "add") {
      addItem({
        itemImage:
          "https://i.ibb.co/mXhgNPp/dd9dc9d83423bc037b511d73b29e6b80.jpg",
        itemName: itemDataState.name,
        itemPrice: itemDataState.price,
        itemDescription: itemDataState.description,
        itemCategory: itemCategory.id,
      });
    }
    onTogglePopup(false);
    setIsSubmitting(false);
  };

  return (
    <>
      <Form size="large" onSubmit={handleSubmit}>
        <Form.Input
          required
          fluid
          label="Item Name"
          placeholder="item name"
          name="name"
          value={itemDataState.name}
          onChange={handleChange}
        />
        <Form.Input
          required
          fluid
          label="Item Price"
          placeholder="item price"
          name="price"
          value={itemDataState.price}
          onChange={handleChange}
        />
        <Form.Field
          required
          control={TextArea}
          label="Item Description"
          placeholder="Item description"
          name="description"
          value={itemDataState.description}
          onChange={handleChange}
        />
        <div className="item-form__actions-container">
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
    </>
  );
};

export default AddEditItemForm;
