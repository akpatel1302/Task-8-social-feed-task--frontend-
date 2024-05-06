import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import PropTypes from "prop-types";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
});

const CreatePostModal = ({ onClose, onSubmit }) => {
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("isPrivate", false);
      formData.append("image", selectedImage);
      await onSubmit(formData);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  CreatePostModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Create Post</DialogTitle>
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
          <Button
            type="submit"
            color="primary"
            disabled={loading}
            endIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? "Submitting..." : "Submit"}
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
