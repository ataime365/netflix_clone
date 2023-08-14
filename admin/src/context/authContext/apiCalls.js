import axios from "axios"
import { LoginFailure, LoginStart, LoginSuccess } from "./AuthActions"


export const loginCall = async (userCredentials, dispatch)=> {
    dispatch(LoginStart())
    try{
        const res = await axios.post("auth/login", userCredentials);
        // console.log(res)  
        // Only admins should be able to login to the admin dashboard
        res.data.isAdmin && dispatch(LoginSuccess(res.data)) //user data
    }catch(err){
        dispatch(LoginFailure())
    }
}