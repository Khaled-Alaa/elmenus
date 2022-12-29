import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Header, Image } from "semantic-ui-react";
import MainHeader from "../../components/Header";

const NotFound: FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <MainHeader />
      <div
        style={{
          marginTop: "5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexFlow: "column",
        }}
      >
        <Image
          alt="Logo"
          src="/assets/images/404.PNG"
          style={{ width: "auto", height: "250px" }}
        />
        <Header color="orange" as={"h2"}>PAGE NOT FOUND</Header>
        <Button color="orange" onClick={() => navigate("/")}>
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
