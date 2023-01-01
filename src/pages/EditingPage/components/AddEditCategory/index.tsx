import React, { useState, FC, BaseSyntheticEvent, useEffect } from "react";
import { useMutation } from "react-query";
import { Button, Form, Icon, TextArea } from "semantic-ui-react";
import { toast } from "react-toastify";
import { TCategory } from "../../../../interfaces";
import {
  postNewCategoryService,
  putCategoryService,
} from "../../../../services";
import "./styles.scss";

const AddEditCategoryForm: FC<{
  onTogglePopup: (isOpen: boolean) => void;
  actions: (category: TCategory) => void;
  categoryData: TCategory;
  categoryMode: string;
}> = (props: {
  onTogglePopup: (isOpen: boolean) => void;
  actions: (category: TCategory) => void;
  categoryData: TCategory;
  categoryMode: string;
}) => {
  const { onTogglePopup, actions, categoryData, categoryMode } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [categoryDataState, setCategoryDataState] = useState<TCategory>({
    id: 0,
    name: "",
    description: "",
  });

  useEffect(() => {
    if (categoryData && categoryData.id !== 0 && categoryMode === "edit") {
      setCategoryDataState(categoryData);
    }
  }, [categoryData, categoryMode]);

  const { mutate: addCategory } = useMutation<
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
        toast.success("Category added successfully");
      },
      onError: (error) => {
        console.error(error);
        toast.error("Can't update category");
      },
    }
  );

  const { mutate: updateCategory } = useMutation<
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
        toast.success("Category updated successfully");
      },
      onError: (error) => {
        console.error(error);
        toast.error("Can't update category");
      },
    }
  );

  const handleChange = (e: BaseSyntheticEvent) => {
    setCategoryDataState({
      ...categoryDataState,
      [e.target.name]: e.target.value,
    } as TCategory);
  };

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (categoryMode === "edit") {
      updateCategory({
        categoryId: categoryDataState.id,
        categoryName: categoryDataState.name,
        categoryDescription: categoryDataState.description || "",
      });
    } else if (categoryMode === "add") {
      addCategory({
        categoryName: categoryDataState.name,
        categoryDescription: categoryDataState.description || "",
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
          label="Category Name"
          placeholder="category name"
          name="name"
          value={categoryDataState.name}
          onChange={handleChange}
        />
        <Form.Field
          control={TextArea}
          label="Category Description"
          placeholder="category description"
          name="description"
          value={categoryDataState.description}
          onChange={handleChange}
        />
        <div className="category-form__actions-container">
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

export default AddEditCategoryForm;
