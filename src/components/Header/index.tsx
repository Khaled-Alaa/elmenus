import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";

const Header: FC = () => {
  const navigate = useNavigate();

  return (
    <Menu size="small">
      <Container>
        <Menu.Item
          onClick={() => {
            navigate("/");
          }}
        >
          <img alt="Logo" src="/assets/images/logo.svg" />
        </Menu.Item>

        <Menu.Item position="right">
          <Button onClick={() => navigate("/Login")}>LOGIN</Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Header;
