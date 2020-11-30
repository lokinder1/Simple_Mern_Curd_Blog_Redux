import { green, red } from "@material-ui/core/colors";
// import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost, loadPosts } from "../../redux/actions/postActions";
import PostCurdService from "../../utils/PostCurdService";

const PostCurd = new PostCurdService();

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  root: {
    width: "100%",
  },
  container: {
    // maxHeight: 440,
  },
});

export default function ListPosts() {
  const classes = useStyles();

  const posts = useSelector((state) => state.postsList.posts);
  console.log(posts);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  async function getAllPosts() {
    const result = await PostCurd.read().catch((err) => {
      enqueueSnackbar("Posts Loading Failed", { variant: "error" });
      console.log("error :  " + err);
    });
    dispatch(loadPosts(result.data));
    console.log(posts);
  }

  function deletePostByID(id) {
    PostCurd.delete(id)
      .then((res) => {
        enqueueSnackbar("Post Deleted Successfully", { variant: "success" });
        dispatch(deletePost(id));
      })
      .catch((err) => {
        enqueueSnackbar("Post Deletion Failed", { variant: "error" });
      });
  }

  useEffect(getAllPosts(), []);

  var loadPostsCheck = true;
  if (!posts) {
    loadPostsCheck = false;
  }

  return (
    <Paper className={classes.root}>
      {loadPostsCheck ? (
        <div>
          <TableContainer className={classes.container}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Post</StyledTableCell>
                  <StyledTableCell align="right">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loadPostsCheck
                  ? posts
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <StyledTableRow key={row._id}>
                          <StyledTableCell component="th" scope="row">
                            {row.title}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Link to={"/view?post=" + row._id}>
                              <VisibilityTwoToneIcon
                                style={{ color: green[300] }}
                              />
                            </Link>

                            <Link to={"/edit?post=" + row._id}>
                              <EditTwoToneIcon />
                            </Link>

                            <Link to="#">
                              <DeleteForeverTwoToneIcon
                                style={{ color: red[300] }}
                                onClick={() => deletePostByID(row._id)}
                              />
                            </Link>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                  : ""}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={posts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </div>
      ) : (
        ""
      )}
    </Paper>
  );
}
