import {combineReducers} from "redux";
import RegisterReducer from "../RegisterRedux/RegisterReducer";

const rootReducer=combineReducers({
    user:RegisterReducer});
export default rootReducer;