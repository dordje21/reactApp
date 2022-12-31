import {combineReducers} from "redux";
import quizReducer from "./quiz";
import creatReducer from "./creat";
import loginReducer from "./login";
import authReducer from "./auth";

export default combineReducers({
    quiz: quizReducer,
    create: creatReducer,
    login: loginReducer,
    auth: authReducer
})