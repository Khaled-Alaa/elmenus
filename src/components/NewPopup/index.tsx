import React, { FC } from "react";
import { Header, Modal } from "semantic-ui-react";

const Popup: FC<{
  isOpen: boolean;
  onTogglePopup: (isOpen: boolean) => void;
  children: React.ReactNode;
  header: string;
}> = (props: {
  isOpen: boolean;
  onTogglePopup: (isOpen: boolean) => void;
  children: React.ReactNode;
  header: string;
}) => {
  const { isOpen, onTogglePopup, children, header } = props;
  return (
    <Modal
      closeIcon
      open={isOpen}
      onClose={() => onTogglePopup(false)}
      onOpen={() => onTogglePopup(true)}
      size="tiny"
    >
      <Header content={header} />
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
};

export default Popup;
