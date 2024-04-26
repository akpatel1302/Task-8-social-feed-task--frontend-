import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useGetUserMutation } from "../api/SignupApi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function SignInSide() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const [login, { isLoading, isError, error }] = useGetUserMutation();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const storeUserData = (userData) => {
  //   // Store the access token and user data in a cookie
  //   Cookies.set("accessToken", userData.accessToken, {
  //     expires: 7, // Set the expiration to 7 days
  //     httpOnly: true, // Make the cookie HTTP-only
  //     sameSite: "strict", // Set the SameSite flag to 'strict'
  //   }); // Store access token for 7 days
  //   // Cookies.set("userData", JSON.stringify(userData.userData), { expires: 7 }); // Store user data for 7 days
  // };

  // const storeAccessToken = (accessToken) => {
  //   // Store the access token in a cookie
  //   Cookies.set("accessToken", accessToken, {
  //     expires: 7, // Set the expiration to 7 days
  //     sameSite: "strict", // Set the SameSite flag to 'strict'
  //   });
  // };

  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const verificationResponse = await login(formData);
  //     if (verificationResponse.data.success) {
  //       storeAccessToken(verificationResponse.data);
  //       navigate("/home");
  //     } else {
  //       alert("Error verifying user: " + verificationResponse.data.error);
  //     }
  //   } catch (err) {
  //     console.error("Error signing in:", err);
  //     alert("An error occurred. Please try again later.");
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const verificationResponse = await login(formData);
      console.log(verificationResponse);
      if (verificationResponse.data.success) {
        setCookie("accessToken", verificationResponse.data.data.accessToken, 7);
        navigate("/home");
      } else {
        alert("Error verifying user: " + verificationResponse.data.error);
      }
    } catch (err) {
      console.error("Error signing in:", err);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={handleInputChange}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleInputChange}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link to={"/"} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
              {isError && <div>Error: {JSON.stringify(error.data)}</div>}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignInSide;
