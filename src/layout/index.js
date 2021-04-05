import { Component } from "react";

import { Route, Switch } from "react-router-dom";

import MainHeader from "../components/header/index";
import Footer from "../components/Footer/index";
import RestaurantPage from "../pages/RestaurantPage/index";

import "./styles.scss";

class Layout extends Component {
  render() {
    return (
      <>
        <MainHeader />
        <Switch>
          <Route exact path="/Restaurant" render={() => <RestaurantPage />} />
        </Switch>
        <Footer />
      </>
    );
  }
}

export default Layout;
