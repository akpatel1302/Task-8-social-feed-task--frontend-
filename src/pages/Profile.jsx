import { useState } from "react";
import {
  useFetchUserQuery,
  // useUpdateUserProfileMutation,
} from "../api/userApi";
import Navbar from "../component/Navbar";
import EditProfileModal from "../component/EditProfileModal";
import {
  CircularProgress,
  Typography,
  Button,
  Grid,
  Paper,
  makeStyles,
  Avatar,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    padding: theme.spacing(4),
    justifyContent: "center",
  },
  profilePaper: {
    padding: theme.spacing(4),
    // marginBottom: theme.spacing(4),
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginBottom: theme.spacing(2),
  },
  editButton: {
    marginTop: theme.spacing(2),
    background: "linear-gradient(to right, #8E2DE2, #4A00E0)",
  },
}));

const UserProfilePage = () => {
  const classes = useStyles();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [updateUserProfile] = useUpdateUserProfileMutation();

  const { data: user, isLoading, isError, error } = useFetchUserQuery();

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <Navbar />
        <h2>Error Fetching User Data</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <Navbar />
        <h2>User Not Found</h2>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Grid container className={classes.profileContainer}>
        <Grid item xs={12} sm={8} md={6}>
          <Paper elevation={12} className={classes.profilePaper}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} align="center">
                <Avatar alt="Profile Picture" className={classes.avatar} />
                <Typography variant="h5">{`${user.data.firstname} ${user.data.lastname}`}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Username: {user.data.username}
                </Typography>
                <Typography variant="subtitle1">
                  Email: {user.data.email}
                </Typography>
              </Grid>
              <Grid item xs={12} align="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEditProfile}
                  className={classes.editButton}
                >
                  Edit Profile
                </Button>
              </Grid>
            </Grid>
          </Paper>
          {isEditModalOpen && (
            <EditProfileModal user={user} onClose={handleCloseEditModal} />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default UserProfilePage;
