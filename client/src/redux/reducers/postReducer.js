import { actionTypes } from "../actions/postActions";

export const InitialState = {
  posts: [],
  status: "idle",
  error: null,
};

const postReducer = (state = InitialState, action) => {
  
  switch (action.type) {
    case actionTypes.LOAD_POSTS: {
      return {
        ...state,
        posts: action.data,
      };
    }
    case actionTypes.ADD_POST:
      return {
        ...state,
        posts: state.posts.concat(action.data),
      };
    case actionTypes.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.id),
      };
    case actionTypes.EDIT_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.data._id ? (action.data) : post
        ),
      };
    default:
      return { ...state };
  }
};
export default postReducer;
