import {combineReducers} from "redux";
import reducerUser from "./user";
import reducerProduct from "./product";

let rootReducer = combineReducers({
    reducerUser,
    reducerProduct
});


export default rootReducer;