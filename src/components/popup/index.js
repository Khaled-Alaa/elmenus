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
          Modal heading
          {/*console.log(props.clicked)*/}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
    </Modal>
  );
}
