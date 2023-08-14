
import { createContext, useReducer } from "react";
import ListReducer from "./ListReducer";


const INITIAL_STATE = {
    // user: null,
    lists: [], //New
    isFetching: false,  // isFetching determines the beginning and end of the process
    error: false
};

export const ListContext = createContext(INITIAL_STATE);

export const ListContextProvider = ({ children })=> {
    const [state, dispatch] = useReducer(ListReducer, INITIAL_STATE);

    return (
        <ListContext.Provider 
        value={{ 
            lists: state.lists, 
            isFetching: state.isFetching, 
            error: state.error, 
            dispatch }} >

        {children}

        </ListContext.Provider>
    )
}







