import {applyMiddleware, combineReducers, createStore} from "redux";
import todoListReducer from "./reducer";
import thunkMiddleware from "redux-thunk"




const rootReducer = combineReducers({
    todoList: todoListReducer
});

const store =createStore(rootReducer, applyMiddleware(thunkMiddleware));


 export default store;

// const store = createStore(reducer, applyMiddleware(thunkMiddleware));
    // export default store;




