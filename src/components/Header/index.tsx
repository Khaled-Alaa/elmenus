import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Icon, Image, Label, Menu } from "semantic-ui-react";
import { UserContext } from "../../context/userContext";
import "./styles.scss";

const MainHeader: FC = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  return (
    <Menu size="small">
      <Container>
        <Menu.Item
          onClick={() => {
            navigate("/");
          }}
        >
          <Image
            alt="Logo"
            src="/assets/images/Logo.svg"
            className="header__logo-image"
          />
        </Menu.Item>

        <Menu.Item position="right">
          {userContext.user.id ? (
            <Button color="orange" onClick={() => navigate("/Edit")}>
              Admin
            </Button>
          ) : (
            <Button basic color="orange" onClick={() => navigate("/Login")}>
              LOGIN
            </Button>
          )}
          {userContext.user.id ? (
            <Label basic color="orange" size="large">
              <Icon name="user" />
              Welcome, {userContext.user.username}
            </Label>
          ) : (
            <></>
          )}
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default MainHeader;
