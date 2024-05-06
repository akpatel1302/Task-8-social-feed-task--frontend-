import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import PropTypes from "prop-types";

const Modal = ({ children, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
//for prop
Modal.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
