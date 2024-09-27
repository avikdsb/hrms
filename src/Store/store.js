import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { rootContentConfigReducer } from "./ContentConfigurations/contentconfig.reducers";
import { thunk } from "redux-thunk";

// created root reducer where all reducer are getting stored
const root_reducer = combineReducers({
    contentReducer : rootContentConfigReducer
})

// created store to available for all component , exported in index.js file
export const store = legacy_createStore(root_reducer, applyMiddleware(thunk))

