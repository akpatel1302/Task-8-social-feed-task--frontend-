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
import { useSignupMutation } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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

  const notify = (message) => {
    toast(message);
  };

  const validationSchema = Yup.object({
    firstname: Yup.string()
      .required("Firstname is required")
      .min(2, "Firstname must be at least 2 characters")
      .max(30, "Firstname must be at most 30 characters")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "Firstname must contain only alphanumeric characters."
      ),
    lastname: Yup.string()
      .required("Lastname is required")
      .min(2, "Lastname must be at least 2 characters")
      .max(30, "Lastname must be at most 30 characters")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "Lastname must contain only alphanumeric characters."
      ),
    username: Yup.string()
      .required("Username is required")
      .min(6, "Username must be at least 6 characters")
      .max(30, "Username must be at most 30 characters")
      .matches(
        /^[a-zA-Z0-9-_@.]+$/,
        "Username must contain only alphanumeric characters and/or the following special characters: -, _, @, and ."
      ),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "The password must be at least 8 characters")
      .max(15, "The password can be at most 15 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [signup, { isLoading, isError, error }] = useSignupMutation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match. Please confirm your password.");
      return;
    }

    try {
      data.isPrivate = false;
      await signup(data);
      navigate("/signin");
      notify("Signup success");
    } catch (err) {
      console.error("Error signing up:", err);
      notify("Signup failed");
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
                  <div style={{ color: "red" }}>{errors.firstname.message}</div>
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
                {errors.lastname && (
                  <div style={{ color: "red" }}>{errors.lastname.message}</div>
                )}
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
                {errors.username && (
                  <div style={{ color: "red" }}>{errors.username.message}</div>
                )}
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
                {errors.email && (
                  <div style={{ color: "red" }}>{errors.email.message}</div>
                )}
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
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
                {errors.password && (
                  <div style={{ color: "red" }}>{errors.password.message}</div>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("confirmPassword")}
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  autoComplete="new-password"
                />
                {errors.confirmPassword && (
                  <div style={{ color: "red" }}>
                    {errors.confirmPassword.message}
                  </div>
                )}
              </Grid>
              <Grid item xs={12}>
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
              onClick={notify}
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Sign Up"}
            </Button>
            <ToastContainer />
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
