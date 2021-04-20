import React, { Component } from "react";
import axios from "axios";

import SubHeader from "./components/SubHeader/index";
import SideBar from "./components/SideBar/index";

import "./styles.scss";

class RestaurantPage extends Component {
  state = {
    data: [],
    filteredData: [],
    categoryName: "Appetizers",
  };

  componentDidMount() {
    axios
      .get("http://localhost:4000/categories")
      .then((resp) => {
        this.setState({
          data: resp.data,
          filteredData: resp.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  selecetedCategory(categoryName) {
    console.log(categoryName);
    axios
      .get(`http://localhost:4000/categories?name=${categoryName}`)
      .then((resp) => {
        this.setState({
          categoryName: categoryName,
          filteredData: resp.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="page-container">
        <SubHeader />
        <SideBar
          category={this.state.categoryName}
          data={this.state.data}
          filteredData={this.state.filteredData}
          onSelectedCategory={this.selecetedCategory.bind(this)}
        />
      </div>
    );
  }
}

export default RestaurantPage;
