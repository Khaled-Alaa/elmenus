import { Component } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./styles.scss";

class AddCategoryItem extends Component {
  state = {
    itemName: "",
    itemDescription: "",
  };

  addCategoryItem = (e) => {
    e.preventDefault();
    console.log(this.state.itemName);
    console.log(this.state.itemDescription);
  };
  render() {
    return (
      <Form>
        <h6>items</h6>
        <Form.Row>
          <Form.Group className="inputs-button">
            <Form.Control
              type="text"
              placeholder="English Name"
              onChange={(e) => this.setState({ itemName: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="English Description"
              onChange={(e) =>
                this.setState({ itemDescription: e.target.value })
              }
            />
          </Form.Group>
          <Button
            variant="success"
            type="submit"
            className="create-button"
            onClick={this.addCategoryItem.bind(this)}
          >
            Create
          </Button>
        </Form.Row>
      </Form>
    );
  }
}

export default AddCategoryItem;
