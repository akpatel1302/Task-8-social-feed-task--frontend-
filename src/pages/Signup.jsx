// import * as React from "react";
// import { useForm } from "react-hook-form";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { Link } from "react-router-dom";
// import { useSignupMutation } from "../api/SignupApi";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Instagram
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// const defaultTheme = createTheme();

// function SignUp() {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = React.useState(false);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const [setFormData] = useState({
//     firstname: "",
//     lastname: "",
//     username: "",
//     email: "",
//     password: "",
//     isPrivate: false,
//   });
//   const [signup, { isLoading, isError, error }] = useSignupMutation();

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const onSubmit = async (data) => {
//     try {
//       data.isPrivate = false;
//       await signup(data);
//       setFormData({
//         firstname: "",
//         lastname: "",
//         username: "",
//         email: "",
//         password: "",
//         isPrivate: false,
//       });
//       navigate("/signin");
//     } catch (err) {
//       console.error("Error signing up:", err);
//       alert("Error signing up: " + (err.data || "Unknown error"));
//     }
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign up
//           </Typography>
//           <Box
//             component="form"
//             noValidate
//             onSubmit={handleSubmit(onSubmit)}
//             sx={{ mt: 3 }}
//           >
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   {...register("firstname", {
//                     required: "First Name is required",
//                   })}
//                   autoComplete="given-name"
//                   name="firstname"
//                   required
//                   fullWidth
//                   id="firstname"
//                   label="First Name"
//                   autoFocus
//                 />
//                 {errors.firstname && (
//                   <div>Error: {errors.firstname.message}</div>
//                 )}
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   {...register("lastname", {
//                     required: "Last Name is required",
//                   })}
//                   required
//                   fullWidth
//                   id="lastname"
//                   label="Last Name"
//                   name="lastname"
//                   autoComplete="family-name"
//                 />
//                 {errors.lastname && <div>Error: {errors.lastname.message}</div>}
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   {...register("username", {
//                     required: "Username is required",
//                   })}
//                   required
//                   fullWidth
//                   id="username"
//                   label="User Name"
//                   name="username"
//                   autoComplete="username"
//                 />
//                 {errors.username && <div>Error: {errors.username.message}</div>}
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   {...register("email", {
//                     required: "Email is required",
//                     pattern: {
//                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                       message: "Invalid email address",
//                     },
//                   })}
//                   required
//                   fullWidth
//                   id="email"
//                   label="Email Address"
//                   name="email"
//                   autoComplete="email"
//                 />
//                 {errors.email && <div>Error: {errors.email.message}</div>}
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   {...register("password", {
//                     required: "Password is required",
//                   })}
//                   required
//                   fullWidth
//                   name="password"
//                   label="Password"
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   autoComplete="new-password"
//                 />
//                 {errors.password && <div>Error: {errors.password.message}</div>}
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       value="allowExtraEmails"
//                       color="primary"
//                       onClick={togglePasswordVisibility}
//                     />
//                   }
//                   label="Show Password"
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//               disabled={isLoading}
//             >
//               {isLoading ? "Loading..." : "Sign Up"}
//             </Button>
//             <Grid container justifyContent="flex-end">
//               <Grid item>
//                 <Link to={"/signin"} variant="body2">
//                   Already have an account? Sign in
//                 </Link>
//               </Grid>
//             </Grid>
//             {isError && <div>Error: {JSON.stringify(error.data)}</div>}
//           </Box>
//         </Box>
//         <Copyright sx={{ mt: 5 }} />
//       </Container>
//     </ThemeProvider>
//   );
// }

// export default SignUp;

import * as React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useSignupMutation } from "../api/SignupApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Instagram
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const validationSchema = Yup.object({
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    isPrivate: false,
  });
  const [signup, { isLoading, isError, error }] = useSignupMutation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      data.isPrivate = false;
      await signup(data);
      setFormData({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        isPrivate: false,
      });
      navigate("/signin");
    } catch (err) {
      console.error("Error signing up:", err);
      alert("Error signing up: " + (err.data || "Unknown error"));
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("firstname")}
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus
                />
                {errors.firstname && (
                  <div>Error: {errors.firstname.message}</div>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("lastname")}
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="family-name"
                />
                {errors.lastname && <div>Error: {errors.lastname.message}</div>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("username")}
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="username"
                />
                {errors.username && <div>Error: {errors.username.message}</div>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("email")}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                {errors.email && <div>Error: {errors.email.message}</div>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("password")}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                />
                {errors.password && <div>Error: {errors.password.message}</div>}
                <FormControlLabel
                  control={
                    <Checkbox
                      value="allowExtraEmails"
                      color="primary"
                      onClick={togglePasswordVisibility}
                    />
                  }
                  label="Show Password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Sign Up"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={"/signin"} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            {isError && <div>Error: {JSON.stringify(error.data)}</div>}
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
