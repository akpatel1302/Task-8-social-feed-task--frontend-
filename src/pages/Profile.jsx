// --------------------------------------------- edit field
import { useState } from "react";
import { useFetchUserQuery } from "../api/userApi";
import Navbar from "../component/Navbar";
import EditProfileModal from "../component/EditProfileModal";

const UserProfilePage = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data: user, isLoading, isError, error } = useFetchUserQuery();
  // {
  // accessToken: Cookies.get("accessToken"),
  // }

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

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
