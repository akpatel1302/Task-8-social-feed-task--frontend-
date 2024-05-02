import { useForm } from "react-hook-form";
import { useUpdateUserProfileMutation } from "../api/userApi";
import Cookies from "js-cookie";
import Modal from "./Modal";
import {
  TextField,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

const EditProfileModal = ({ user, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: user.data.firstname,
      lastname: user.data.lastname,
      username: user.data.username,
      email: user.data.email,
    },
  });
  const [updateUserProfile] = useUpdateUserProfileMutation();

  const onSubmit = async (data) => {
    try {
      console.log("-------data---->", data);
      await updateUserProfile({
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        email: data.email,
        accessToken: Cookies.get("accessToken"),
      }).unwrap();
      onClose();
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="First Name"
            name="firstname"
            {...register("firstname", { required: "First name is required" })}
            error={!!errors.firstname}
            helperText={errors.firstname?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="lastname"
            {...register("lastname", { required: "Last name is required" })}
            error={!!errors.lastname}
            helperText={errors.lastname?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Username"
            name="username"
            {...register("username", { required: "Username is required" })}
            error={!!errors.username}
            helperText={errors.username?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
            margin="normal"
          />
          <DialogActions>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Modal>
  );
};

export default EditProfileModal;
