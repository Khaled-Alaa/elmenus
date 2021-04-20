import { Component } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./styles.scss";

class AddCategory extends Component {
  state = {
    categoryName: "",
    description: "",
  };

  addCategory = (e) => {
    e.preventDefault();
    console.log(this.state.categoryName);
    console.log(this.state.description);
    
  };
  render() {
    return (
      <Form className="editing-container__card">
        <h6>Add Category</h6>
        <Form.Row>
          <Form.Group className="inputs-button">
            <Form.Control
              type="text"
              placeholder="English Name"
              onChange={(e) => this.setState({ categoryName: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="English Description"
              onChange={(e) => this.setState({ description: e.target.value })}
            />
          </Form.Group>
          <Button
            variant="success"
            type="submit"
            className="create-button"
            onClick={this.addCategory.bind(this)}
          >
            Create category
          </Button>
        </Form.Row>
      </Form>
    );
  }
}

export default AddCategory;
