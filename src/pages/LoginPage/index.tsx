import { useState, FC, useContext, BaseSyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Header,
  Loader,
  Segment,
  Grid,
  Image,
} from "semantic-ui-react";
import { toast } from "react-toastify";

import { UserContext } from "../../context/userContext";
import { getUserByNameAndPasswordService } from "../../services";
import MainHeader from "../../components/Header";
import "./styles.scss";

const LoginPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSubmitting(true);

    try {
      const loggedUsersData = await getUserByNameAndPasswordService(
        e.target.username.value,
        e.target.password.value
      );
      if (
        loggedUsersData &&
        loggedUsersData.length === 1 &&
        loggedUsersData[0].role === "admin"
      ) {
        userContext.setUser(loggedUsersData[0]);
        navigate("/Edit");
      } else {
        toast.error("User not found");
      }
    } catch (error) {
      console.error(error);
      toast.error("User not found");
    }
    setIsLoading(false);
    setIsSubmitting(false);
  };

  return (
    <div className="login-page-container">
      <MainHeader />
      <Grid
        textAlign="center"
        verticalAlign="middle"
        className="login-page-container__login-card-container"
      >
        <Grid.Column className="login-page-container__login-card">
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Header as="h2" textAlign="center">
                <Image
                  alt="Logo"
                  src="/assets/images/Logo.svg"
                  className="login-page-container__login-card-image"
                />
              </Header>
              <Form.Input
                required
                fluid
                label="Username"
                placeholder="username"
                name="username"
              />
              <Form.Input
                required
                fluid
                label="Password"
                placeholder="password"
                type="password"
                name="password"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                color="orange"
                fluid
                size="large"
              >
                <Loader active={isLoading} inline size="mini" /> Login
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default LoginPage;
