export const loginUser=(user)=>{
    return (dispatch)=>{
        return dispatch({
            type:"LOGIN_USER",
            payload:{...user}
        })
    }
}
export const logoutUser=()=>{
    return (dispatch)=>{
        return dispatch({
            type:"LOGOUT_USER",
            payload:null
        })
    }
}