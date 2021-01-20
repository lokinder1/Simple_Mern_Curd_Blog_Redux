import { Paper } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCurdService from "../../utils/PostCurdService";

const PostCurd = new PostCurdService();

const useStyles = makeStyles((theme) => ({
  title: {
    background: theme.palette.primary.light,
    border: 0,
    borderRadius: 3,
    color: theme.palette.black,
    padding: theme.spacing(2),
    textTransform: "uppercase",
    margin: theme.spacing(1),
  },

  content: {
    background: theme.palette.primary.contrastText,
    border: 0,
    borderRadius: 3,
    color: theme.palette.black,
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
}));

export default function ViewPost() {
  const classes = useStyles();
  const [post, setPost] = useState([]);
  const posts = useSelector((state) => state.postsList.posts);


  async function getPost() {
    var urlParams = new URLSearchParams(window.location.search);
    var postId = urlParams.get("post");
    let post = posts.filter((post) => post._id === postId);
    setPost(post[0]);
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <Container maxWidth="xl">
      <Paper className={classes.title}>
        <Typography variant="h5">{post? post.title:''}</Typography>
      </Paper>
      <Paper className={classes.content}>
        <Typography variant="body1">{post? post.content: ''}</Typography>
      </Paper>
    </Container>
  );
}
