import { useState } from "react";
import {
  useFetchUserQuery,
  // useUpdateUserProfileMutation,
} from "../api/userApi";
import Navbar from "../component/Navbar";
import EditProfileModal from "../component/EditProfileModal";
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  edit: {
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
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h2>Error Fetching User Data</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <h2>User Not Found</h2>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div>
        <h2>User Profile</h2>
        <p>First Name: {user.data.firstname}</p>
        <p>Last Name: {user.data.lastname}</p>
        <p>Username: {user.data.username}</p>
        <p>Email: {user.data.email}</p>
        <button className={classes.edit} onClick={handleEditProfile}>
          Edit Profile
        </button>
        {isEditModalOpen && (
          <EditProfileModal user={user} onClose={handleCloseEditModal} />
        )}
      </div>
    </>
  );
};

export default UserProfilePage;
