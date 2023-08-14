
import { createContext, useReducer } from "react";
import MovieReducer from "./MovieReducer";


const INITIAL_STATE = {
    // user: null,
    movies: [], //New
    isFetching: false,  // isFetching determines the beginning and end of the process
    error: false
};

export const MovieContext = createContext(INITIAL_STATE);

export const MovieContextProvider = ({ children })=> {
    const [state, dispatch] = useReducer(MovieReducer, INITIAL_STATE);

    return (
        <MovieContext.Provider 
        value={{ 
            movies: state.movies, 
            isFetching: state.isFetching, 
            error: state.error, 
            dispatch }} >

        {children}

        </MovieContext.Provider>
    )
}







