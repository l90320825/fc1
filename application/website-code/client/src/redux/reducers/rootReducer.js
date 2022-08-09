import { combineReducers } from "redux";
import customerReducer from "./customerReducer";
import searchReducer from "./searchReducer";
import authReducer from "./authReducer";
export default combineReducers({
  customerReducer,
  searchReducer,
  auth: authReducer,
});
