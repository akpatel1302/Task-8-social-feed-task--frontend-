// import { Link, useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";

// const Navbar = () => {
//   const navigate = useNavigate();

//     const handleLogout = () => {
//     Cookies.remove("accessToken");
//     navigate("/login");
//   };

//   return (
//     <nav>
//       <ul>
//         <li>
//           <Link to="/home">Home</Link>
//         </li>
//         <li>
//           <Link to="/profile">Profile</Link>
//         </li>
//       </ul>
//       <button onClick={handleLogout}>Logout</button>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    navigate("/login");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Instagram Clone
          </Typography>
          <Button color="inherit" component={Link} to="/home">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/profile">
            Profile
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
