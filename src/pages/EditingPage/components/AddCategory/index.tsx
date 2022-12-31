import React, { useState, FC } from "react";
import { useMutation } from "react-query";
import { Button, Form, Header, Icon, Modal,TextArea } from "semantic-ui-react";
import Popup from "../../../../components/Popup";
import { TCategory } from "../../../../interfaces";
import { postNewCategoryService } from "../../../../services";

const AddCategory: FC<{
  isOpen: boolean;
  onTogglePopup: (isOpen: boolean) => void;
  actions: (category: TCategory) => void;
}> = (props: {
  isOpen: boolean;
  onTogglePopup: (isOpen: boolean) => void;
  actions: (category: TCategory) => void;
}) => {
  const { isOpen, onTogglePopup, actions } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate } = useMutation<
    TCategory,
    unknown,
    { categoryName: string; categoryDescription: string }
  >(
    ({ categoryName: name, categoryDescription: description }) =>
      postNewCategoryService({
        categoryName: name,
        categoryDescription: description,
      }),
    {
      onSuccess: (data: TCategory) => {
        actions(data);
      },
    }
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    mutate({
      categoryName: e.target.categoryName.value,
      categoryDescription: e.target.categoryDescription.value || "",
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
            name="categoryName"
          />
          <Form.Field
            control={TextArea}
            label="Category Description"
            placeholder="category description"
            name="categoryDescription"
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

export default AddCategory;
