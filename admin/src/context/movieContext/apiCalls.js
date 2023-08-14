import axios from "axios"
import { createMovieFailure, createMovieStart, createMovieSuccess, deleteMovieFailure, deleteMovieStart, deleteMovieSuccess, 
    getMoviesFailure, getMoviesStart, getMoviesSuccess } from "./MovieActions"


export const getMoviesCall = async (dispatch)=> {
    dispatch(getMoviesStart())

    try{
        const res = await axios.get("movies", 
                                    { 
                                        headers: {token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,},
                                    });
        // Only admins should be able to login to the admin dashboard
        dispatch(getMoviesSuccess(res.data)) //user data
    }catch(err){
        dispatch(getMoviesFailure())
    }
}

export const deleteMovieCall = async (id, dispatch)=> {
    dispatch(deleteMovieStart())

    try{
        await axios.delete(`movies/${id}`, 
                                    { 
                                        headers: {token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,},
                                    });
        // Only admins should be able to login to the admin dashboard
        dispatch(deleteMovieSuccess(id)) //user data
    }catch(err){
        dispatch(deleteMovieFailure())
    }
}


// Create Movie
export const createMovieCall = async (movie, dispatch)=> {
    dispatch(createMovieStart())

    try{
        const res = await axios.post(`movies/`, movie, 
                                    { 
                                        headers: {token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,},
                                    });
        // Only admins should be able to login to the admin dashboard
        dispatch(createMovieSuccess(res.data)) //user data
    }catch(err){
        dispatch(createMovieFailure())
    }
}