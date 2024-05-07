import { useState, useEffect, useMemo } from "react";
import useCookie from "../userContext/UserContext";
import { useFetchPostsQuery, useCreatePostsMutation } from "../api/postApi";
import CreatePostModal from "../component/CreatePostModal";
import Navbar from "../component/Navbar";
import {
  TextField,
  Grid,
  makeStyles,
  Button,
  CircularProgress,
} from "@material-ui/core";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const cookieValue = useCookie();
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);

  const { data: postData, isLoading: postsLoading } = useFetchPostsQuery({
    page: 1,
    perPage: 20,
    search: debouncedSearch,
    isMyPostsOnly: false,
    isPrivate: false,
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

  const debounce = (func, delay = 300) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const debounceSearch = useMemo(
    () =>
      debounce((value) => {
        setDebouncedSearch(value);
      }, 1000),
    []
  );

  const handleSearch = (value) => {
    setSearchQuery(value);
    debounceSearch(value); // Calling the memoized debounced function here
    console.log(value);
  };

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  return (
    <div className={classes.root}>
      <Navbar />
      <TextField
        label="Search"
        variant="standard"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{}}
      />
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
