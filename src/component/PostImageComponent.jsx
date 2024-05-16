/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useRef } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  makeStyles,
  Avatar,
} from "@material-ui/core";
import { useFetchImageQuery } from "../api/postApi";
import useIsVisible from "./VirtualScroll";

const PostCard = ({ post }) => {
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
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    media: {
      height: 500,
      objectFit: "contain",
      cursor: "default",
    },
    actionArea: {
      padding: theme.spacing(2),
    },
    avatar: {
      width: theme.spacing(6),
      height: theme.spacing(6),
      marginRight: theme.spacing(1),
    },
  }));
  const classes = useStyles();
  const {
    data: imageData,
    isLoading: imageLoading,
    isError: imageError,
    refetch: refetchImage,
  } = useFetchImageQuery(post._id);

  

  const PostRef = useRef();
  const postsss = useIsVisible(PostRef);

  return (
    <Grid ref={PostRef} item xs={12} sm={12} md={12} key={post._id}>
      {postsss && (
        <Card className={classes.card}>
          <CardActionArea className={classes.actionArea}>
            {/* <Typography gutterBottom variant="h5" component="h2">
            {post.userData.username}
          </Typography> */}
            {/* <Grid container alignItems="center">
            <Grid item>
              <Avatar
                alt="Profile Picture"
                className={classes.avatar}
              />
            </Grid>
            <Grid item>
              <Typography gutterBottom variant="subtitle1" component="h2">
                {post.userData.username}
              </Typography>
            </Grid>
          </Grid> */}
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
      )}
    </Grid>
  );
};

export default PostCard;
