import { useState } from "react";
import {
  useFetchUserQuery,
  // useUpdateUserProfileMutation,
} from "../api/userApi";
import Navbar from "../component/Navbar";
import EditProfileModal from "../component/EditProfileModal";

const UserProfilePage = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [updateUserProfile] = useUpdateUserProfileMutation();

  const {
    data: user,
    isLoading,
    isError,
    error,
    // refetch: refetchUsers,
  } = useFetchUserQuery();
  // {
  // accessToken: Cookies.get("accessToken"),
  // }

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  // const handleUpdateProfile = async (updatedUserData) => {
  //   try {
  //     await updateUserProfile(updatedUserData).unwrap();
  //     setIsEditModalOpen(false);
  //     refetchUser();
  //   } catch (error) {
  //     console.error("Error updating user profile:", error);
  //   }
  // };

  if (isLoading) {
    return <div>Loading...</div>;
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
        <button onClick={handleEditProfile}>Edit Profile</button>
        {isEditModalOpen && (
          <EditProfileModal user={user} onClose={handleCloseEditModal} />
        )}
      </div>
    </>
  );
};

export default UserProfilePage;
