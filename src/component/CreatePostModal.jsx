import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  name: {
    padding: theme.spacing(2),
  },
}));

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
});

const CreatePostModal = ({ onClose, onSubmit }) => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFormSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("isPrivate", false);
    formData.append("image", selectedImage);
    onSubmit(formData);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle className={classes.name}>Create Post</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <TextField
            label="Title"
            name="title"
            {...register("title")}
            error={!!errors?.title}
            helperText={errors?.title && errors?.title.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            {...register("description")}
            multiline
            minRows={4}
            fullWidth
            margin="normal"
          />
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            onChange={handleImageUpload}
          />
          <Button type="submit" color="primary">
            Submit
          </Button>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
        </form>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default CreatePostModal;
