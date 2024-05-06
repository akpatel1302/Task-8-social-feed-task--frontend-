/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
// home.jsx
// import useCookie from "../userContext/UserContext";
// import { useState } from "react";
// import { useFetchPostsQuery, useCreatePostsMutation } from "../api/postApi";
// import CreatePostModal from "../component/CreatePostModal";
// import Navbar from "../component/Navbar";
// import { Grid, makeStyles, Button, CircularProgress } from "@material-ui/core";
// const useStyles = makeStyles((theme) => ({
//   root: {
//     padding: theme.spacing(3),
//   },
//   card: {
//     height: "100%",
//     display: "flex",
//     flexDirection: "column",
//   },
//   cardContent: {
//     flexGrow: 1,
//   },
//   createPostButton: {
//     marginTop: theme.spacing(2),
//     marginBottom: theme.spacing(2),
//   },
//   media: {
//     height: 200,
//     objectFit: "cover",
//   },
//   actionArea: {
//     padding: theme.spacing(2),
//   },
// }));
// import PostCard from "../component/PostImageComponent";

// function authenticateToken(accessToken) {
//   return accessToken !== "";
// }

// const Home = () => {
//   const cookieValue = useCookie();

//   // console.log(cookieValue.cookie);
//   const classes = useStyles();
//   const [showModal, setShowModal] = useState(false);
//   const {
//     data: postData,
//     // refetch: refetchPosts
//   } = useFetchPostsQuery({
//     page: 1,
//     perPage: 20,
//     search: "",
//     isMyPostsOnly: false,
//     isPrivate: false,
//   });

//   const [createPost] = useCreatePostsMutation();

//   const handleCreatePost = async (postData) => {
//     try {
//       // console.log("-----> post=data", postData);
//       postData.isPrivate = false;

//       if (authenticateToken(cookieValue.cookie)) {
//         await createPost(postData).unwrap();
//         setShowModal(false);
//         // refetchPosts();
//       } else {
//         console.error("Access token authentication failed");
//       }
//     } catch (error) {
//       console.error("Error creating post:", error);
//     }
//   };

//   return (
//     <div className={classes.root}>
//       <Navbar />
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => setShowModal(true)}
//         className={classes.createPostButton}
//       >
//         Create Post
//       </Button>
//       {showModal && (
//         <CreatePostModal
//           onClose={() => setShowModal(false)}
//           onSubmit={handleCreatePost}
//         />
//       )}
//       <Grid container spacing={3}>
//         {postData?.data?.data?.map((post) => (
//           <PostCard post={post} />
//         ))}
//       </Grid>
//     </div>
//   );
// };

// export default Home;

import useCookie from "../userContext/UserContext";
import { useState } from "react";
import { useFetchPostsQuery, useCreatePostsMutation } from "../api/postApi";
import CreatePostModal from "../component/CreatePostModal";
import Navbar from "../component/Navbar";
import { Grid, makeStyles, Button, CircularProgress } from "@material-ui/core";
import PostCard from "../component/PostImageComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  createPostButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

function authenticateToken(accessToken) {
  return accessToken !== "";
}

const Home = () => {
  const cookieValue = useCookie();
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  // const [loadingPosts, setLoadingPosts] = useState(true);

  const { data: postData, isLoading: postsLoading } = useFetchPostsQuery({
    page: 1,
    perPage: 20,
    search: "",
    isMyPostsOnly: false,
    isPrivate: false,
    // onSuccess: () => setLoadingPosts(false),
  });

  const [createPost] = useCreatePostsMutation();

  const handleCreatePost = async (postData) => {
    try {
      postData.isPrivate = false;

      if (authenticateToken(cookieValue.cookie)) {
        await createPost(postData).unwrap();
        setShowModal(false);
      } else {
        console.error("Access token authentication failed");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className={classes.root}>
      <Navbar />
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowModal(true)}
        className={classes.createPostButton}
      >
        Create Post
      </Button>
      {showModal && (
        <CreatePostModal
          onClose={() => setShowModal(false)}
          onSubmit={handleCreatePost}
        />
      )}
      {postsLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {postData?.data?.data?.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Home;
