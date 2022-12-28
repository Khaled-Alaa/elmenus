import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Image, Menu } from "semantic-ui-react";

const MainHeader: FC = () => {
  const navigate = useNavigate();

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
            style={{ width: "100px", height: "auto" }}
          />
        </Menu.Item>

        <Menu.Item position="right">
          <Button onClick={() => navigate("/Login")}>LOGIN</Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default MainHeader;
