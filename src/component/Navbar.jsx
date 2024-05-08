import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Icon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: "linear-gradient(to right, #8E2DE2, #4A00E0)",
    boxShadow: "none",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "white",
    textDecoration: "none",
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
    [theme.breakpoints.down("xs")]: {
      flexGrow: 0,
    },
    color: "white",
    textDecoration: "none",
  },
  linkButton: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleLogout = () => {
    const validate = window.confirm("Are you sure you want to logout?");
    if (validate) {
      Cookies.remove("accessToken");
      navigate("/login");
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Icon
            edge="start"
            className={classes.menuButton}
            color="inherit"
            component={Link}
            to="/home"
          >
            <InstagramIcon />
          </Icon>
          <Typography
            variant="h6"
            component={Link}
            to="/home"
            className={classes.title}
          >
            Instagram clone
          </Typography>
          <Button
            color="inherit"
            component={Link}
            to="/home"
            className={classes.linkButton}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/profile"
            className={classes.linkButton}
          >
            Profile
          </Button>
          <Button
            color="inherit"
            onClick={handleLogout}
            className={classes.linkButton}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
