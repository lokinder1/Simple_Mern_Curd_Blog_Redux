import { Paper } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
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

  async function getPost() {
    var urlParams = new URLSearchParams(window.location.search);
    const result = await PostCurd.readById(urlParams.get("post"));
    setPost(result.data);
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <Container maxWidth="xl">
      <Paper className={classes.title}>
        <Typography variant="h5">{post.title}</Typography>
      </Paper>
      <Paper className={classes.content}>
        <Typography variant="content1">{post.content}</Typography>
      </Paper>
    </Container>
  );
}
