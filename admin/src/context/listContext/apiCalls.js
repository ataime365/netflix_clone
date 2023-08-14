import axios from "axios"
import { createListFailure, createListStart, createListSuccess, deleteListFailure, deleteListStart, deleteListSuccess,
        getListsFailure, getListsStart, getListsSuccess } 
        from "./ListActions";


export const getListsCall = async (dispatch)=> {
    dispatch(getListsStart())

    try{
        const res = await axios.get("lists", 
                                    { 
                                        headers: {token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,},
                                    });
        // Only admins should be able to login to the admin dashboard
        // This updates our reducer
        dispatch(getListsSuccess(res.data)) //user data
    }catch(err){
        dispatch(getListsFailure())
    }
}

export const deleteListCall = async (id, dispatch)=> {
    dispatch(deleteListStart())

    try{
        await axios.delete(`lists/${id}`, 
                                    { 
                                        headers: {token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,},
                                    });
        // Only admins should be able to login to the admin dashboard
        dispatch(deleteListSuccess(id)) //user data
    }catch(err){
        dispatch(deleteListFailure())
    }
}


// Create Movie
export const createListCall = async (list, dispatch)=> {
    dispatch(createListStart())

    try{
        const res = await axios.post(`lists/`, list, 
                                    { 
                                        headers: {token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,},
                                    });
        // Only admins should be able to login to the admin dashboard
        dispatch(createListSuccess(res.data)) //user data
    }catch(err){
        dispatch(createListFailure())
    }
}


