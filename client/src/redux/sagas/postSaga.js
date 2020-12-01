import { all, call, put, takeLatest } from "redux-saga/effects";
import PostCurdService from "../../utils/PostCurdService";
import {
  actionTypes,

  addPost,
  deletePost,
  editPost, loadPosts
} from "../actions/postActions";

const PostCurd = new PostCurdService();

// api calls

async function getPostsData() {
  try {
    const result = await PostCurd.read().catch((err) => {
      console.log("error :  " + err);
    });
    return result.data;
  } catch (error) {
    console.log("error", error);
  }
}

async function addPostData(post) {
  try {
    const result = await PostCurd.create(post);
    return result.data;
  } catch (error) {
    console.log("error", error);
  }
}

async function updatePostData(id, post) {
  try {
    const result = await PostCurd.update(id, post);
    return result.data;
  } catch (error) {
    console.log("error", error);
  }
}

async function deletePostData(id) {
  try {
    const result = PostCurd.delete(id);
    return result;
  } catch (error) {
    console.log("error", error);
  }
}

//saga workers
function* getPostsWorker() {
  try {
    const result = yield call(getPostsData);
    yield put(loadPosts(result));
  } catch (error) {
    console.log(error);
  }
}

function* addPostWorker(action) {
  try {
    console.log(action);
    const data = yield call(addPostData, action.post);
    // console.log(data);
    yield put(addPost(data));
  } catch (error) {
    console.log(error);
  }
}

function* deletePostWorker(action) {
  try {
    console.log(action);
    const data = yield call(deletePostData, action.id);
    yield put(deletePost(action.id));
  } catch (error) {
    console.log(error);
  }
}

function* updatePostWorker(action) {
  try {
    console.log(action);
    const data = yield call(updatePostData, action.id, action.post);
    yield put(editPost(data));
  } catch (error) {
    console.log(error);
  }
}

//saga watchers

export function* getPostsWatcher() {
  yield takeLatest(actionTypes.LOAD_POSTS_SAGA, getPostsWorker);
}

export function* addPostWatcher() {
  yield takeLatest(actionTypes.ADD_POST_SAGA, addPostWorker);
}

export function* deletePostWatcher() {
  yield takeLatest(actionTypes.DELETE_POST_SAGA, deletePostWorker);
}

export function* updatePostWatcher() {
  yield takeLatest(actionTypes.EDIT_POST_SAGA, updatePostWorker);
}

function* rootSaga() {
  yield all([
    getPostsWatcher(),
    addPostWatcher(),
    deletePostWatcher(),
    updatePostWatcher(),
  ]);
}

export default rootSaga;
