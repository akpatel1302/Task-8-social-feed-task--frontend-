import { useFetchUserQuery } from "../api/SignupApi";
import Cookies from "js-cookie";
import Navbar from "../component/Navbar";

const MyComponent = () => {
  function authenticateToken(accessToken) {
    return accessToken !== "";
  }

  // const accessToken = Cookies.get("accessToken");
  // console.log(accessToken);
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useFetchUserQuery({ accessToken: Cookies.get("accessToken") });

  // console.log(user);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error("Error fetching user data:", error);
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

  console.log(user);
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
    </>
  );
};

export default MyComponent;
