// import React, { useState } from "react";
// import { useCreatePostsMutation } from "../api/SignupApi";
// import CreatePostModal from "../component/CreatePostModal";
// import Navbar from "../component/Navbar";

// function getCookie(cname) {
//   let name = cname + "=";
//   let decodedCookie = decodeURIComponent(document.cookie);
//   let ca = decodedCookie.split(";");
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) === " ") {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) === 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }

// function authenticateToken(accessToken) {
//   return accessToken !== "";
// }

// const Home = () => {
//   const [showModal, setShowModal] = useState(false);
//   // const accessToken = getCookie("accessToken");
//   const [createPost, { isLoading, isError, error }] = useCreatePostsMutation();

//   const handleCreatePost = async (postData) => {
//     try {
//       postData.isPrivate = false;
//       const accessToken = getCookie("accessToken");
//       if (authenticateToken(accessToken)) {
//         await createPost({ postData, accessToken });
//         setShowModal(false);
//       } else {
//         console.error("Access token authentication failed");
//       }
//     } catch (error) {
//       console.error("Error creating post:", error);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <button onClick={() => setShowModal(true)}>Create Post</button>
//       {showModal && (
//         <CreatePostModal
//           onClose={() => setShowModal(false)}
//           onSubmit={handleCreatePost}
//         />
//       )}
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import {
  useFetchPostsMutation,
  useCreatePostsMutation,
} from "../api/SignupApi";
import CreatePostModal from "../component/CreatePostModal";
import Navbar from "../component/Navbar";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    flexGrow: 1,
  },
  createPostButton: {
    marginBottom: theme.spacing(2),
  },
}));

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function authenticateToken(accessToken) {
  return accessToken !== "";
}

const Home = () => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [fetchPosts, { data: posts, isLoading, isError, error }] =
    useFetchPostsMutation();
  const [
    createPost,
    { isLoading: isCreatingPost, isError: isCreateError, error: createError },
  ] = useCreatePostsMutation();
  const accessToken = getCookie("accessToken");

  useEffect(() => {
    const params = {
      page: 1,
      perPage: 20,
      search: "",
      isMyPostsOnly: false,
      isPrivate: false,
    };
    fetchPosts(params);
  }, [fetchPosts]);

  const handleCreatePost = async (postData) => {
    try {
      postData.isPrivate = false;
      if (authenticateToken(accessToken)) {
        await createPost({ postData, accessToken });
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
      <Grid container spacing={3}>
        {posts?.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {post.title}
                </Typography>
                <Typography>{post.content}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
