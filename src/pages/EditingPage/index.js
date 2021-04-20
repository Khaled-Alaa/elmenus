import { Component } from "react";

import axios from "axios";

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import AddCategory from "./components/AddCategory/index";
import EditCategory from "./components/EditCategory/index";
import AddCategoryItem from "./components/AddCategoryItem/index";
import EditCategoryItem from "./components/EditCategoryItem/index";

import "./styles.scss";

class EditingPage extends Component {
  state = {
    data: [],
    activeKey: "",
  };

  onEdit = (e, id) => {
    if (this.state.activeKey !== id) {
      this.setState({
        activeKey: id,
      });
    } else {
      this.setState({
        activeKey: "",
      });
    }
  };

  onDelete = (e, id) => {
    alert(id);
  };

  componentDidMount() {
    axios
      .get("http://localhost:4000/categories")
      .then((resp) => {
        this.setState({
          data: resp.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="editing-container">
        <AddCategory />
        <div className="editing-container__card">
          <h6>Menu Data</h6>
          {this.state.data.map((dish) => (
            <div>
              <Accordion className="editing-container__dishes">
                <Card>
                  <Card.Header className="test">
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      <i className="fas fa-bars burger-menu-icon"></i>
                      {dish.name}
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body className="card-content">
                      <div>
                        <EditCategory
                          category={dish.name}
                          categoryDescription={dish.description}
                        />
                        <AddCategoryItem />
                      </div>
                      {dish.items.map((item) => (
                        <Accordion activeKey={this.state.activeKey}>
                          <Card>
                            <Card.Header className="test2">
                              <Accordion.Toggle
                                as={Button}
                                variant="link"
                                eventKey={item.id}
                                onClick={(e) => this.onEdit(e, item.id)}
                              >
                                <i className="fas fa-bars burger-menu-icon"></i>
                                {item.name}
                              </Accordion.Toggle>
                              <Button
                                className="edit-delete-buttons"
                                variant="danger"
                                type="submit"
                                onClick={(e) => this.onDelete(e, item.id)}
                              >
                                Delete
                              </Button>
                              <Button
                                className="edit-delete-buttons"
                                variant="warning"
                                type="submit"
                                onClick={(e) => this.onEdit(e, item.id)}
                                // onClick={this.openAccordion}
                              >
                                Edit
                              </Button>
                            </Card.Header>
                            <Accordion.Collapse eventKey={item.id}>
                              <Card.Body>
                                <EditCategoryItem
                                  itemName={item.name}
                                  itemDescription={item.description}
                                />
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                        </Accordion>
                      ))}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default EditingPage;
