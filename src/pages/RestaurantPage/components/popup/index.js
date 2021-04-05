import Modal from "react-bootstrap/Modal";

export default function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <img
        src="https://i.ibb.co/92NGT9x/Depositphotos-71652087-original-min.jpg"
        alt="ButcherBurgerLogo"
        className="detailed-photo"
      ></img>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.item.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.item.description}</p>
      </Modal.Body>
    </Modal>
  );
}
