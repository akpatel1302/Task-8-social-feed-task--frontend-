import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  TextField,
  Button,
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core";
import {
  Home,
  Search,
  AddBox,
  FavoriteBorder,
  ChatBubbleOutline,
  SendOutlined,
  PersonOutline,
  ExitToApp,
} from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "#fff",
    color: "#000",
    boxShadow: "none",
    borderBottom: "1px solid #dbdbdb",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(2),
  },
  logo: {
    fontWeight: "bold",
  },
  navIcon: {
    color: "#000",
  },
  content: {
    padding: theme.spacing(2),
  },
  post: {
    marginBottom: theme.spacing(2),
  },
  postHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1, 2),
  },
  postImage: {
    width: "100%",
    height: "auto",
  },
  postActions: {
    padding: theme.spacing(1, 2),
  },
  postComments: {
    padding: theme.spacing(1, 2),
  },
  commentInput: {
    flexGrow: 1,
    marginRight: theme.spacing(1),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: "johndoe",
      profilePicture: "https://via.placeholder.com/150",
      imageUrl: "https://via.placeholder.com/600x400",
      caption: "Beautiful sunset!",
      likes: 100,
      comments: [
        { id: 1, username: "janedoe", text: "Wow, amazing!" },
        { id: 2, username: "bobsmith", text: "Love this photo!" },
      ],
    },
    {
      id: 2,
      username: "sarahjones",
      profilePicture: "https://via.placeholder.com/150",
      imageUrl: "https://via.placeholder.com/600x400",
      caption: "Enjoying the beach",
      likes: 75,
      comments: [
        { id: 1, username: "mikebrown", text: "Looks like a great time!" },
        { id: 2, username: "emilywilson", text: "Wish I was there!" },
      ],
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [newPost, setNewPost] = useState("");
  const [open, setOpen] = useState(false);

  const handleLike = (postId) => {
    // Implement like functionality
  };

  const handleComment = (postId) => {
    // Implement comment functionality
  };

  const handleCreatePost = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleSubmitPost = () => {
    // Implement post creation functionality
    setOpen(false);
  };

  const handleNavigateToProfile = () => {
    history.push("/profile");
  };

  const handleLogout = () => {
    // Remove the access token from the cookie
    Cookies.remove("accessToken");
    // Navigate to the login page
    navigate("/login");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.logo}>
            Instagram
          </Typography>
          <div>
            <IconButton className={classes.navIcon}>
              <Home />
            </IconButton>
            <IconButton className={classes.navIcon}>
              <Search />
            </IconButton>
            <IconButton className={classes.navIcon} onClick={handleCreatePost}>
              <AddBox />
            </IconButton>
            <IconButton className={classes.navIcon}>
              <FavoriteBorder />
            </IconButton>
            <IconButton
              className={classes.navIcon}
              onClick={handleNavigateToProfile}
            >
              <PersonOutline />
            </IconButton>
            <IconButton className={classes.navIcon} onClick={handleLogout}>
              <ExitToApp />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid item xs={12} key={post.id} className={classes.post}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" src={post.profilePicture}>
                      {post.username[0].toUpperCase()}
                    </Avatar>
                  }
                  title={post.username}
                />
                <CardMedia
                  className={classes.postImage}
                  image={post.imageUrl}
                  title={post.caption}
                />
                <CardActions className={classes.postActions}>
                  <IconButton
                    aria-label="like"
                    onClick={() => handleLike(post.id)}
                  >
                    <FavoriteBorder />
                  </IconButton>
                  <IconButton
                    aria-label="comment"
                    onClick={() => handleComment(post.id)}
                  >
                    <ChatBubbleOutline />
                  </IconButton>
                  <IconButton aria-label="share">
                    <SendOutlined />
                  </IconButton>
                </CardActions>
                <CardContent>
                  <Typography variant="body1" color="textPrimary" component="p">
                    {post.caption}
                  </Typography>
                </CardContent>
                <CardContent className={classes.postComments}>
                  {post.comments.map((comment) => (
                    <div key={comment.id} className={classes.comment}>
                      <Avatar
                        aria-label="recipe"
                        className={classes.avatar}
                        style={{ width: 24, height: 24 }}
                      >
                        {comment.username[0].toUpperCase()}
                      </Avatar>
                      <Typography variant="body2" color="textSecondary">
                        <strong>{comment.username}</strong> {comment.text}
                      </Typography>
                    </div>
                  ))}
                  <div className={classes.comment}>
                    <TextField
                      className={classes.commentInput}
                      label="Add a comment..."
                      variant="outlined"
                      size="small"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={<SendOutlined />}
                      onClick={() => handleComment(post.id)}
                    >
                      Post
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.modalPaper}>
            <Typography variant="h6" gutterBottom>
              Create a New Post
            </Typography>
            <TextField
              label="Caption"
              variant="outlined"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitPost}
              fullWidth
              className={classes.modalButton}
            >
              Post
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default HomePage;
