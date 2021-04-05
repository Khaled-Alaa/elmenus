import { Component } from "react";

import { Route, Switch } from "react-router-dom";

import MainHeader from "../components/header/index";
import Footer from "../components/Footer/index";
import RestaurantPage from "../pages/RestaurantPage/index";
import LoginPage from "../pages/LoginPage/index";
import EditingPage from "../pages/EditingPage/index";

import "./styles.scss";

class Layout extends Component {
  render() {
    return (
      <>
        <MainHeader />
        <Switch>
          <Route exact path="/" render={(props) => <LoginPage {...props} />} />
          <Route path="/Restaurant" render={() => <RestaurantPage />} />
          <Route path="/Edit" render={() => <EditingPage />} />
        </Switch>
        <Footer />
      </>
    );
  }
}

export default Layout;
