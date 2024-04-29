// import React from 'react';

// const PostFeed = ({ posts }) => {
//   return (
//     <div>
//       {posts.map((post) => (
//         <div key={post.id}>
//           <h3>{post.title}</h3>
//           <p>{post.content}</p>
//           {/* Add more post details as needed */}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PostFeed;

// import React from "react";
// import { useQuery } from "react-query";
// import { useFetchPostsMutation } from "../api/SignupApi";

// const PostFeed = () => {
//   const {
//     data: posts,
//     isLoading,
//     isError,
//     error,
//   } = useQuery("posts", useFetchPostsMutation);

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error: {error.message}</div>;

//   return (
//     <div>
//       {posts.map((post) => (
//         <div key={post.id}>
//           <h3>{post.title}</h3>
//           <p>{post.content}</p>
//           {/* Add more post details as needed */}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PostFeed;
