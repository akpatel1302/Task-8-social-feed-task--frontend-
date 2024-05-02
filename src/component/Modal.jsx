import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const Modal = ({ children, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Edit Profile
        {/* <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton> */}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
