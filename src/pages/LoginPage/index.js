import { Component } from "react";

import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import "./styles.scss";

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (
      this.state.email === "khaled@gmail.com" &&
      this.state.password === "123"
    ) {
      this.props.history.push("/Edit");
    } else {
      toast.error("Wrong Email or Password");
    }
  };
  // console.log(this.state);

  render() {
    return (
      <div className="form-container">
        <Form>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Email
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={3}>
              Password
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalCheck">
            <Col>
              <Form.Check label="Remember me" />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col>
              <Button type="submit" onClick={this.onSubmit.bind(this)}>
                Sign in
              </Button>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col>
              <Link to="/restaurant">Global User</Link>
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default LoginPage;
