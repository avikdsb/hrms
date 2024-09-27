import { get_permission, update_permission } from "./contentconfig.types";

// initial state for state management
const initialState = {
    Accountant : {},
    Admin:{},
    Finance:{},
    HR:{},
    TeamMember:{}
}

// reducer where every action and payload are reduced
export const rootContentConfigReducer = (state = initialState, action) =>{
    switch(action.type){
        case update_permission : 
            return {
                ...state,
                ...action.payload
            };
        case get_permission:
            return {
            }
        default:
            return state
    }
}

