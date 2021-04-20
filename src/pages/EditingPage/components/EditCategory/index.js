import { Component } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./styles.scss";

class EditCategory extends Component {
  state = {
    categoryName: "",
    description: "",
  };

  editCategory = (e) => {
    e.preventDefault();
    console.log(this.state.categoryName);
    console.log(this.state.description);
  };

  // eidtCategory = (e) => {
  //   this.setState({
  //     categoryName: e.target.vaule,
  //   });
  //   console.log(e.target.value);
  // };

  componentDidMount() {
    if (this.state.categoryName !== this.props.category) {
      this.setState({
        categoryName: this.props.category,
        description:
          this.props.categoryDescription === undefined
            ? "Empty"
            : this.props.categoryDescription,
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
                value={this.state.categoryName}
                required
                onChange={(e) =>
                  this.setState({ categoryName: e.target.value })
                }
              />
            </Form.Group>
          </Form.Group>
          <Form.Group>
            <h6>Description</h6>
            <Form.Control
              type="text"
              value={this.state.description}
              onChange={(e) => this.setState({ description: e.target.value })}
            />
          </Form.Group>
          <Button
            className="save-button"
            variant="success"
            type="submit"
            onClick={this.editCategory.bind(this)}
          >
            Save
          </Button>
        </Form.Row>
      </Form>
    );
  }
}

export default EditCategory;
