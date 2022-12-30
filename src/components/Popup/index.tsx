import React, { FC } from "react";
import { Modal } from "semantic-ui-react";

const Popup: FC<{
  isOpen: boolean;
  onTogglePopup: (isOpen: boolean) => void;
  children: React.ReactNode;
}> = (props: {
  isOpen: boolean;
  onTogglePopup: (isOpen: boolean) => void;
  children: React.ReactNode;
}) => {
  const { isOpen, onTogglePopup, children } = props;
  return (
    <Modal
      closeIcon
      open={isOpen}
      onClose={() => onTogglePopup(false)}
      onOpen={() => onTogglePopup(true)}
      size="tiny"
    >
      {children}
    </Modal>
  );
};

export default Popup;
