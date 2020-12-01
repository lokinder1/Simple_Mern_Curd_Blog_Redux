/*
 * action types
 */
export const actionTypes = {
  ADD_POST: "ADD_POST",
  DELETE_POST: "DELETE_POST",
  EDIT_POST: "EDIT_POST",
  LOAD_POSTS: "LOAD_POSTS",
  ADD_POST_SAGA: "ADD_POST_SAGA",
  DELETE_POST_SAGA: "DELETE_POST_SAGA",
  EDIT_POST_SAGA: "EDIT_POST_SAGA",
  LOAD_POSTS_SAGA: "LOAD_POSTS_SAGA",
};

/*
 * action creators
 */

export function loadPosts(data) {
  return { type: actionTypes.LOAD_POSTS, data };
}

export function addPost(data) {
  return { type: actionTypes.ADD_POST, data };
}

export function deletePost(id) {
  return { type: actionTypes.DELETE_POST, id };
}

export function editPost(data) {
  return { type: actionTypes.EDIT_POST, data };
}
