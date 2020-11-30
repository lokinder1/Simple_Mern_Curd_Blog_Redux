import { combineReducers } from 'redux'
import postReducer from './postReducer'

const rootReducer= combineReducers({
    postsList: postReducer
})
export default rootReducer;