/*
 * action types
 */
export const actionTypes = {
  ADD_POST: "ADD_POST",
  DELETE_POST: "DELETE_POST",
  EDIT_POST: "EDIT_POST",
  LOAD_POSTS: "LOAD_POSTS",
};

/*
 * action creators
 */

export function loadPosts(data) {
  console.log(data);
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
