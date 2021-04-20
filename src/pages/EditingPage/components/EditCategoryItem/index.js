import { Component } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./styles.scss";

class EditCategoryItem extends Component {
  state = {
    itemName: "",
    itemDescription: "",
  };

  editCategoryItem = (e) => {
    e.preventDefault();
    console.log(this.state.itemName);
    console.log(this.state.itemDescription);
  };
  componentDidMount() {
    if (this.state.itemName !== this.props.itemName) {
      this.setState({
        itemName: this.props.itemName,
        itemDescription: this.props.itemDescription,
      });
    }
  }

  render() {
    return (
      <Form>
        <Form.Row>
          <Form.Group>
            <h6>Name</h6>
            <Form.Group className="inputs-button">
              <Form.Control
                type="text"
                value={this.state.itemName}
                onChange={(e) => this.setState({ itemName: e.target.value })}
              />
            </Form.Group>
          </Form.Group>
          <Form.Group>
            <h6>Description</h6>
            <textarea
              type="text"
              value={this.state.itemDescription}
              rows="4"
              cols="50"
              onChange={(e) =>
                this.setState({ itemDescription: e.target.value })
              }
            />
          </Form.Group>
          <Button
            className="save-button"
            variant="success"
            type="submit"
            onClick={this.editCategoryItem.bind(this)}
          >
            Save
          </Button>
        </Form.Row>
      </Form>
    );
  }
}

export default EditCategoryItem;
