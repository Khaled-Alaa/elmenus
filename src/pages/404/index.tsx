import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Header, Image } from "semantic-ui-react";
import MainHeader from "../../components/Header";
import "./styles.scss";

const NotFound: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <MainHeader />
      <div className="not-found-404-container">
        <Image
          alt="Logo"
          src="/assets/images/404.PNG"
          className="not-found-404-container__image"
        />
        <Header color="orange" as={"h2"}>
          PAGE NOT FOUND
        </Header>
        <Button color="orange" onClick={() => navigate("/")}>
          Go Home
        </Button>
      </div>
    </>
  );
};

export default NotFound;
