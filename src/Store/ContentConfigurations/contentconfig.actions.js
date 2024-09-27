import { update_permission } from "./contentconfig.types"


// update redux state
export const contentPermissionAction = (data) => ({
    type: update_permission,
    payload: data
})

// get the data from local storage and send it redux store
export const getContentPermission = () =>{
    console.log('hi')
    return (dispatch)=>{
        const data = localStorage.getItem('rolePermissions')
        if(data){
            const parsedData = JSON.parse(data)
            dispatch(contentPermissionAction(parsedData))
        } else {
            dispatch(contentPermissionAction({}))
        }
    }
}