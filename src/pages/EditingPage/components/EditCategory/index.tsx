import React, { useState, FC, BaseSyntheticEvent, useEffect } from "react";
import { useMutation } from "react-query";
import { Button, Form, Header, Icon, Modal, TextArea } from "semantic-ui-react";
import Popup from "../../../../components/Popup";
import { TCategory } from "../../../../interfaces";
import { putCategoryService } from "../../../../services";

const EditCategory: FC<{
  isOpen: boolean;
  onTogglePopup: (isOpen: boolean) => void;
  actions: (category: TCategory) => void;
  categoryData: TCategory;
}> = (props: {
  isOpen: boolean;
  onTogglePopup: (isOpen: boolean) => void;
  actions: (category: TCategory) => void;
  categoryData: TCategory;
}) => {
  const { isOpen, onTogglePopup, actions, categoryData } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [editCategoryData, setEditCategoryData] = useState<TCategory>({
    id: 0,
    name: "",
    description: "",
  });

  useEffect(() => {
    if (categoryData && categoryData.id !== 0) {
      setEditCategoryData(categoryData);
    }
  }, [categoryData]);

  const { mutate } = useMutation<
    TCategory,
    unknown,
    {
      categoryId: number;
      categoryName: string;
      categoryDescription: string;
    }
  >(
    ({
      categoryId: id,
      categoryName: name,
      categoryDescription: description,
    }) =>
      putCategoryService({
        categoryId: id,
        categoryName: name,
        categoryDescription: description,
      }),
    {
      onSuccess: (data: TCategory) => {
        actions(data);
      },
      onError: (error) => {
        alert(error);
      },
    }
  );

  const handleChange = (e: BaseSyntheticEvent) => {
    setEditCategoryData({
      ...editCategoryData,
      [e.target.name]: e.target.value,
    } as TCategory);
  };

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    mutate({
      categoryId: editCategoryData.id,
      categoryName: editCategoryData.name,
      categoryDescription: editCategoryData.description || "",
    });

    onTogglePopup(false);
    setIsSubmitting(false);
  };

  return (
    <Popup isOpen={isOpen} onTogglePopup={onTogglePopup}>
      <Header content="Add New Category" />
      <Modal.Content>
        <Form size="large" onSubmit={handleSubmit}>
          <Form.Input
            required
            fluid
            label="Category Name"
            placeholder="category name"
            name="name"
            value={editCategoryData.name}
            onChange={handleChange}
          />
          <Form.Field
            control={TextArea}
            label="Category Description"
            placeholder="category description"
            name="description"
            value={editCategoryData.description}
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
    </Popup>
  );
};

export default EditCategory;
