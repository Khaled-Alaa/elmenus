import React, { FC } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

const Popup: FC<{
  isOpen: boolean;
  setpopup: (isOpen: boolean) => void;
}> = (props: { isOpen: boolean; setpopup: (isOpen: boolean) => void }) => {
  const { isOpen, setpopup } = props;
  return (
    <Modal
      closeIcon
      open={isOpen}
      onClose={() => setpopup(false)}
      onOpen={() => setpopup(true)}
    >
      <Header icon="archive" content="Archive Old Messages" />
      <Modal.Content>
        <p>
          Your inbox is getting full, would you like us to enable automatic
          archiving of old messages?
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setpopup(false)}>
          <Icon name="remove" /> No
        </Button>
        <Button color="green" onClick={() => setpopup(false)}>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default Popup;
