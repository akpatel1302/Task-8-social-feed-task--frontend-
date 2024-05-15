// import { useState, useEffect, useMemo } from "react";
// import useCookie from "../userContext/UserContext";
// import { useFetchPostsQuery, useCreatePostsMutation } from "../api/postApi";
// import CreatePostModal from "../component/CreatePostModal";
// import Navbar from "../component/Navbar";
// import Switch from "@mui/material/Switch";
// import Stack from "@mui/material/Stack";
// import {
//   TextField,
//   makeStyles,
//   Button,
//   CircularProgress,
//   Typography,
//   Card,
//   CardContent,
// } from "@material-ui/core";
// import PostCard from "../component/PostImageComponent";
// import Pagination from "@mui/material/Pagination";

// const label = { inputProps: { "aria-label": "Switch demo" } };
// const useStyles = makeStyles((theme) => ({
//   root: {
//     paddingTop: theme.spacing(8),
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(2),
//     paddingBottom: theme.spacing(2),
//   },
//   search: {
//     marginBottom: theme.spacing(2),
//     width: "100%",
//   },
//   createPostButton: {
//     marginBottom: theme.spacing(2),
//     background: "linear-gradient(to right, #8E2DE2, #4A00E0)",
//   },
//   card: {
//     marginBottom: theme.spacing(2),
//     backgroundColor: theme.palette.background.default,
//     borderRadius: theme.spacing(2), // Adding border radius
//     border: "1px solid #e0e0e0", // Adding border
//     transition: "box-shadow 0.3s ease-in-out",
//     "&:hover": {
//       boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
//     },
//   },
//   pagination: {
//     marginTop: theme.spacing(2),
//     display: "flex",
//     justifyContent: "center",
//   },
// }));

// function authenticateToken(accessToken) {
//   return accessToken !== "";
// }

// const Home = () => {
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const [isMyPostsOnly, setIsMyPostsOnly] = useState("");
//   const cookieValue = useCookie();
//   const classes = useStyles();
//   const [showModal, setShowModal] = useState(false);

//   const {
//     data: postData,
//     isLoading: postsLoading,
//     // isFetching,
//   } = useFetchPostsQuery({
//     page: page,
//     perPage: 20,
//     search: debouncedSearch,
//     isMyPostsOnly: isMyPostsOnly,
//     isPrivate: false,
//   });

//   const [createPost] = useCreatePostsMutation();

//   const handleCreatePost = async (postData) => {
//     try {
//       postData.isPrivate = false;

//       if (authenticateToken(cookieValue.cookie)) {
//         await createPost(postData).unwrap();
//         setShowModal(false);
//       } else {
//         console.error("Access token authentication failed");
//       }
//     } catch (error) {
//       console.error("Error creating post:", error);
//     }
//   };

//   const debounce = (func, delay = 300) => {
//     let timeoutId;
//     return (...args) => {
//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(() => func(...args), delay);
//     };
//   };

//   const debounceSearch = useMemo(
//     () =>
//       debounce((value) => {
//         setDebouncedSearch(value);
//         setPage(1);
//       }, 1000),
//     []
//   );

//   const handleSearch = (value) => {
//     setSearchQuery(value);
//     debounceSearch(value);
//   };

//   useEffect(() => {
//     handleSearch(searchQuery);
//   }, [searchQuery]);

//   useEffect(() => {
//     if (postData) {
//       setTotalPages(Math.ceil(postData.data.total / 20));
//     }
//   }, [postData]);

//   // const handleToggleMyPostsOnly = () => {
//   //   if (isMyPostsOnly == "on") {
//   //     setIsMyPostsOnly(false);
//   //   } else {
//   //     setIsMyPostsOnly("on");
//   //   }
//   // };
//   const handleToggleMyPostsOnly = () => {
//     setIsMyPostsOnly((prev) => (prev === "on" ? "" : "on"));
//   };

//   console.log(isMyPostsOnly);

//   return (
//     <>
//       <Navbar />
//       <div className={classes.root}>
//         <div className={classes.search} style={{ display: "flex" }}>
//           <TextField
//             position="fixed"
//             className={classes.search}
//             label="Search"
//             variant="standard"
//             fullWidth
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />

//           <Switch
//             {...label}
//             checked={isMyPostsOnly}
//             onChange={handleToggleMyPostsOnly}
//           />
//           <Typography variant="body2">MyPosts</Typography>
//         </div>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => setShowModal(true)}
//           className={classes.createPostButton}
//         >
//           Create Post
//         </Button>
//         {showModal && (
//           <CreatePostModal
//             onClose={() => setShowModal(false)}
//             onSubmit={handleCreatePost}
//           />
//         )}
//         {postsLoading ? (
//           <CircularProgress />
//         ) : postData?.data?.data?.length > 0 ? (
//           <>
//             {postData.data.data.map((post) => (
//               <Card key={post.id} className={classes.card}>
//                 <CardContent>
//                   <PostCard post={post} />
//                 </CardContent>
//               </Card>
//             ))}
//             <Stack spacing={2}>
//               <Pagination
//                 count={totalPages}
//                 page={page}
//                 onChange={(event, newPage) => setPage(newPage)}
//                 color="primary"
//                 className={classes.pagination}
//               />
//             </Stack>
//           </>
//         ) : (
//           <Typography variant="body1">No posts found</Typography>
//         )}
//       </div>
//     </>
//   );
// };

// export default Home;
// --------------------------infinite scroll success-----------------------------------------------------------
// import { useState, useEffect, useMemo, useRef } from "react";
// import useCookie from "../userContext/UserContext";
// import { useFetchPostsQuery, useCreatePostsMutation } from "../api/postApi";
// import CreatePostModal from "../component/CreatePostModal";
// import Navbar from "../component/Navbar";
// import Switch from "@mui/material/Switch";
// import {
//   TextField,
//   makeStyles,
//   Button,
//   CircularProgress,
//   Typography,
//   Card,
//   CardContent,
// } from "@material-ui/core";
// import PostCard from "../component/PostImageComponent";

// const label = { inputProps: { "aria-label": "Switch demo" } };
// const useStyles = makeStyles((theme) => ({
//   root: {
//     paddingTop: theme.spacing(8),
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(2),
//     paddingBottom: theme.spacing(2),
//   },
//   search: {
//     marginBottom: theme.spacing(2),
//     width: "100%",
//   },
//   createPostButton: {
//     marginBottom: theme.spacing(2),
//     background: "linear-gradient(to right, #8E2DE2, #4A00E0)",
//   },
//   card: {
//     marginBottom: theme.spacing(2),
//     backgroundColor: theme.palette.background.default,
//     borderRadius: theme.spacing(2),
//     border: "1px solid #e0e0e0",
//     transition: "box-shadow 0.3s ease-in-out",
//     "&:hover": {
//       boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
//     },
//   },
// }));

// function authenticateToken(accessToken) {
//   return accessToken !== "";
// }

// const Home = () => {
//   const [page, setPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const [isMyPostsOnly, setIsMyPostsOnly] = useState("");
//   const cookieValue = useCookie();
//   const classes = useStyles();
//   const [showModal, setShowModal] = useState(false);
//   const lastPostRef = useRef(null);
//   const [posts, setPosts] = useState([]);

//   const { data: postData, isLoading: postsLoading } = useFetchPostsQuery({
//     page: page,
//     perPage: 5,
//     search: debouncedSearch,
//     isMyPostsOnly: isMyPostsOnly,
//     isPrivate: false,
//   });

//   const [createPost] = useCreatePostsMutation();

//   const handleCreatePost = async (postData) => {
//     try {
//       postData.isPrivate = false;

//       if (authenticateToken(cookieValue.cookie)) {
//         await createPost(postData).unwrap();
//         setShowModal(false);
//       } else {
//         console.error("Access token authentication failed");
//       }
//     } catch (error) {
//       console.error("Error creating post:", error);
//     }
//   };

//   const debounce = (func, delay = 300) => {
//     let timeoutId;
//     return (...args) => {
//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(() => func(...args), delay);
//     };
//   };

//   const debounceSearch = useMemo(
//     () =>
//       debounce((value) => {
//         setDebouncedSearch(value);
//         setPage(0);
//       }, 1000),
//     []
//   );

//   const handleSearch = (value) => {
//     setSearchQuery(value);
//     debounceSearch(value);
//   };

//   useEffect(() => {
//     handleSearch(searchQuery);
//   }, [searchQuery]);

//   useEffect(() => {
//     if (postData && page >= 1) {
//       setPosts((prevPosts) => [...prevPosts, ...postData.data.data]);
//     } else {
//       setPosts(postData?.data?.data || []); // Ensure posts is an array even if data is null
//     }
//   }, [postData]);

//   const handleScroll = () => {
//     if (
//       window.innerHeight + document.documentElement.scrollTop ===
//         document.documentElement.offsetHeight &&
//       !postsLoading
//     ) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [postsLoading]);

//   const handleToggleMyPostsOnly = () => {
//     setIsMyPostsOnly((prev) => (prev === "on" ? "" : "on"));
//     setPage(0);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className={classes.root}>
//         <div className={classes.search} style={{ display: "flex" }}>
//           <TextField
//             position="fixed"
//             className={classes.search}
//             label="Search"
//             variant="standard"
//             fullWidth
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />

//           <Switch
//             {...label}
//             checked={isMyPostsOnly}
//             onChange={handleToggleMyPostsOnly}
//           />
//           <Typography variant="body2">MyPosts</Typography>
//         </div>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => setShowModal(true)}
//           className={classes.createPostButton}
//         >
//           Create Post
//         </Button>
//         {showModal && (
//           <CreatePostModal
//             onClose={() => setShowModal(false)}
//             onSubmit={handleCreatePost}
//           />
//         )}
//         {console.log(posts?.length)}
//         {posts?.length > 0 ? (
//           <>
//             {posts.map((post, index) => (
//               <Card
//                 key={post.id}
//                 className={classes.card}
//                 ref={index === posts?.length - 1 ? lastPostRef : null}
//               >
//                 <CardContent>
//                   <PostCard post={post} />
//                 </CardContent>
//               </Card>
//             ))}
//           </>
//         ) : (
//           <Typography variant="body1">No posts found</Typography>
//         )}
//         {postsLoading && <CircularProgress />}
//       </div>
//     </>
//   );
// };

// export default Home;

import { useState, useEffect, useMemo, useRef } from "react";
import useCookie from "../userContext/UserContext";
import { useFetchPostsQuery, useCreatePostsMutation } from "../api/postApi";
import CreatePostModal from "../component/CreatePostModal";
import Navbar from "../component/Navbar";
import Switch from "@mui/material/Switch";
import {
  TextField,
  makeStyles,
  Button,
  CircularProgress,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import PostCard from "../component/PostImageComponent";

const label = { inputProps: { "aria-label": "Switch demo" } };
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  search: {
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  createPostButton: {
    marginBottom: theme.spacing(2),
    background: "linear-gradient(to right, #8E2DE2, #4A00E0)",
  },
  card: {
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.spacing(2),
    border: "1px solid #e0e0e0",
    transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    },
  },
}));

function authenticateToken(accessToken) {
  return accessToken !== "";
}

const Home = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isMyPostsOnly, setIsMyPostsOnly] = useState("");
  const cookieValue = useCookie();
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const observerRef = useRef(null);
  const [posts, setPosts] = useState([]);

  const { data: postData, isLoading: postsLoading } = useFetchPostsQuery({
    page: page,
    perPage: 5,
    search: debouncedSearch,
    isMyPostsOnly: isMyPostsOnly,
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
        setPage(0);
      }, 1000),
    []
  );

  const handleSearch = (value) => {
    setSearchQuery(value);
    debounceSearch(value);
  };

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (postData && page >= 1) {
      setPosts((prevPosts) => [...prevPosts, ...postData.data.data]);
    } else {
      setPosts(postData?.data?.data || []);
    }
  }, [postData]);

  const handleToggleMyPostsOnly = () => {
    setIsMyPostsOnly((prev) => (prev === "on" ? "" : "on"));
    setPage(0);
  };

  function useIsVisible(ref, rootMargin = "0px") {
    const [isVisble, setIsvisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([observerEntry]) => {
          setIsvisible(observerEntry.isIntersecting);
        },
        { rootMargin }
      );

      if (ref.current !== null) observer.observe(ref.current);

      return () => observer.disconnect();
    }, [ref, rootMargin]);

    return isVisble;
  }

  return (
    <>
      <Navbar />
      <div className={classes.root}>
        <div className={classes.search} style={{ display: "flex" }}>
          <TextField
            position="fixed"
            className={classes.search}
            label="Search"
            variant="standard"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <Switch
            {...label}
            checked={isMyPostsOnly}
            onChange={handleToggleMyPostsOnly}
          />
          <Typography variant="body2">MyPosts</Typography>
        </div>
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
        {posts.map((post, index) => (
          <Card
            key={post.id}
            className={classes.card}
            ref={index === posts.length - 1 ? observerRef : null}
          >
            <CardContent>
              <PostCard post={post} />
            </CardContent>
          </Card>
        ))}
        {postsLoading && <CircularProgress />}
      </div>
    </>
  );
};

export default Home;
