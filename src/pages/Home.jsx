// home.jsx  tdy
import { useState, useEffect } from "react";
import {
  useFetchPostsQuery,
  useCreatePostsMutation,
  useFetchImageQuery,
} from "../api/postApi";
import CreatePostModal from "../component/CreatePostModal";
import Navbar from "../component/Navbar";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  makeStyles,
  Button,
  CardActionArea,
  CardMedia,
} from "@material-ui/core";
import Auth from "../userContext/UserContext";
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
  media: {
    height: 200,
    objectFit: "cover",
  },
  actionArea: {
    padding: theme.spacing(2),
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

// trying user auth
const abcs = Auth;

console.log(abcs);

function authenticateToken(accessToken) {
  return accessToken !== "";
}

const Home = () => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const {
    data: postData,
    isLoading: postLoading,
    isError: postError,
  } = useFetchPostsQuery({
    page: 1,
    perPage: 20,
    search: "",
    isMyPostsOnly: false,
    isPrivate: false,
    accessToken: getCookie("accessToken"),
  });

  const {
    data: imageData,
    isLoading: imageLoading,
    isError: imageError,
    refetch: refetchImage,
  } = useFetchImageQuery(postData?.data?.data[0]?._id);

  const [
    createPost,
    { isLoading: isCreatingPost, isError: isCreateError, error: createError },
  ] = useCreatePostsMutation({
    refetchQueries: [
      {
        query: useFetchPostsQuery,
        variables: {
          page: 1,
          perPage: 20,
          search: "",
          isMyPostsOnly: false,
          isPrivate: false,
          accessToken: getCookie("accessToken"),
        },
      },
    ],
  });

  const handleCreatePost = async (postData) => {
    try {
      console.log("-----> post=data", postData);
      postData.isPrivate = false;
      const accessToken = getCookie("accessToken");
      if (authenticateToken(accessToken)) {
        await createPost(postData).unwrap();
        setShowModal(false);
      } else {
        console.error("Access token authentication failed");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  useEffect(() => {
    if (!postLoading && !postError && postData) {
      console.log("Posts data:", postData.data.data);
      refetchImage(postData.data.data[0]._id);
    }
  }, [postData, postLoading, postError, refetchImage]);

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
        {postData?.data?.data?.map((post) => (
          <Grid item xs={12} sm={12} md={12} key={post._id}>
            <Card className={classes.card}>
              <CardActionArea>
                <Typography gutterBottom variant="h5" component="h2">
                  {post.userData.username}
                </Typography>
                <CardMedia
                  component="img"
                  alt="Post Image"
                  src={imageData?.imageData}
                  className={classes.media}
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {post.title}
                  </Typography>
                  <Typography gutterBottom variant="body2" component="p">
                    {post.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
