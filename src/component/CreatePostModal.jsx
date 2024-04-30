// import React, { useState } from "react";
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
// } from "@material-ui/core";

// const CreatePostModal = ({ onClose, onSubmit }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({ title, description, image });
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   return (
//     <Dialog open={true} onClose={onClose}>
//       <DialogTitle>Create Post</DialogTitle>
//       <DialogContent>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             multiline
//             minRows={4}
//             fullWidth
//             margin="normal"
//           />
//           <input type="file" onChange={handleImageChange} />
//         </form>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Cancel
//         </Button>
//         <Button onClick={handleSubmit} color="primary">
//           Submit
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default CreatePostModal;

import React from "react";
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
import { Description } from "@material-ui/icons";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
});

const CreatePostModal = ({ onClose, onSubmit }) => {
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Create Post</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <TextField
            label="Title"
            name="title"
            value={title}
            inputRef={register}
            error={!!errors.title}
            helperText={errors.title && errors.title.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={description}
            inputRef={register}
            multiline
            minRows={4}
            fullWidth
            margin="normal"
          />
          <input type="file" />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePostModal;
