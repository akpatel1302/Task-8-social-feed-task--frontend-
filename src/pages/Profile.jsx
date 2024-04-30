// import { useFetchUserQuery } from "../api/SignupApi";
// import Cookies from "js-cookie";
// import Navbar from "../component/Navbar";

// const MyComponent = () => {
//   function authenticateToken(accessToken) {
//     return accessToken !== "";
//   }

//   // const accessToken = Cookies.get("accessToken");
//   // console.log(accessToken);
//   const {
//     data: user,
//     isLoading,
//     isError,
//     error,
//   } = useFetchUserQuery({ accessToken: Cookies.get("accessToken") });

//   // console.log(user);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     console.error("Error fetching user data:", error);
//     return (
//       <div>
//         <h2>Error User Data</h2>
//         <p>{error.message}</p>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div>
//         <h2>User Not Found</h2>
//       </div>
//     );
//   }

//   console.log(user);
//   return (
//     <>
//       <Navbar />
//       <div>
//         <h2>User Information</h2>
//         <p>First Name: {user.data.firstname}</p>
//         <p>Last Name: {user.data.lastname}</p>
//         <p>UserName: {user.data.username}</p>
//         <p>Email: {user.data.email}</p>
//       </div>
//     </>
//   );
// };

// export default MyComponent;
// --------------------------------------------- edit field
// import { useState } from "react";
// import { useFetchUserQuery } from "../api/SignupApi";
// import Cookies from "js-cookie";
// import Navbar from "../component/Navbar";
// import EditProfileModal from "../component/EditProfileModal";

// const UserProfilePage = () => {
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);

//   const {
//     data: user,
//     isLoading,
//     isError,
//     error,
//   } = useFetchUserQuery({
//     accessToken: Cookies.get("accessToken"),
//   });

//   const handleEditProfile = () => {
//     setIsEditModalOpen(true);
//   };

//   const handleCloseEditModal = () => {
//     setIsEditModalOpen(false);
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return (
//       <div>
//         <h2>Error Fetching User Data</h2>
//         <p>{error.message}</p>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div>
//         <h2>User Not Found</h2>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div>
//         <h2>User Profile</h2>
//         <p>First Name: {user.data.firstname}</p>
//         <p>Last Name: {user.data.lastname}</p>
//         <p>Username: {user.data.username}</p>
//         <p>Email: {user.data.email}</p>
//         <button onClick={handleEditProfile}>Edit Profile</button>
//         {isEditModalOpen && (
//           <EditProfileModal user={user} onClose={handleCloseEditModal} />
//         )}
//       </div>
//     </>
//   );
// };

// export default UserProfilePage;

//profile.jsx
//profile.jsx
import {
  useFetchUserQuery,
  useUpdateUserProfileMutation,
} from "../api/SignupApi";
import Cookies from "js-cookie";
import Navbar from "../component/Navbar";
import { useState, useEffect } from "react";

const MyComponent = () => {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useFetchUserQuery({ accessToken: Cookies.get("accessToken") });
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [updateUser, { isLoading: isUpdating, isError: updateError }] =
    useUpdateUserProfileMutation();

  useEffect(() => {
    if (user) {
      setFirstname(user.data.firstname);
      setLastname(user.data.lastname);
      setUsername(user.data.username);
      setEmail(user.data.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser({
        accessToken: Cookies.get("accessToken"),
        firstname,
        lastname,
        email,
        username,
      }).unwrap();
      console.log("User profile updated successfully");
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        <h2>Error User Data</h2>
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
        <h2>User Information</h2>
        <p>First Name: {user.data.firstname}</p>
        <p>Last Name: {user.data.lastname}</p>
        <p>UserName: {user.data.username}</p>
        <p>Email: {user.data.email}</p>
      </div>
      <div>
        <h2>Update User Profile</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstname">First Name:</label>
            <input
              type="text"
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lastname">Last Name:</label>
            <input
              type="text"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" disabled={isUpdating}>
            Update Profile
          </button>
        </form>
      </div>
    </>
  );
};

export default MyComponent;
