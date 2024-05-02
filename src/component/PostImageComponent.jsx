/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  makeStyles,
} from "@material-ui/core";
import { useFetchImageQuery } from "../api/postApi";
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
      height: 200,
      objectFit: "cover",
    },
    actionArea: {
      padding: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  const {
    data: imageData,
    isLoading: imageLoading,
    isError: imageError,
    refetch: refetchImage,
  } = useFetchImageQuery(post._id);
  // console.log(imageData)
  // post._id

  return (
    <Grid item xs={12} sm={12} md={12} key={post._id}>
      <Card className={classes.card}>
        <CardActionArea>
          {/* <Typography gutterBottom variant="h5" component="h2">
            {post.userData.username}
          </Typography> */}
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
  );
};

export default PostCard;
