

export const getMoviesStart = () => ({
    type: "GET_MOVIES_START",
})

export const getMoviesSuccess = (movies) => ({
    type: "GET_MOVIES_SUCCESS",
    payload: movies, //when successful the api gives us the user details, send the payload to us
})

export const getMoviesFailure = () => ({
    type: "GET_MOVIES_FAILURE",
})

// Delete
export const deleteMovieStart = () => ({
    type: "DELETE_MOVIE_START",
})

export const deleteMovieSuccess = (id) => ({
    type: "DELETE_MOVIE_SUCCESS",
    payload: id, //when successful the api gives us the user details, send the payload to us
})

export const deleteMovieFailure = () => ({
    type: "DELETE_MOVIE_FAILURE",
})


//Create
export const createMovieStart = () => ({
    type: "CREATE_MOVIE_START",
})

export const createMovieSuccess = (movie) => ({
    type: "CREATE_MOVIE_SUCCESS",
    payload: movie, //when successful the api gives us the user details, send the payload to us
})

export const createMovieFailure = () => ({
    type: "CREATE_MOVIE_FAILURE",
})


//update
export const updateMovieStart = () => ({
    type: "UPDATE_MOVIE_START",
})

export const updateMovieSuccess = (movie) => ({
    type: "UPDATE_MOVIE_SUCCESS",
    payload: movie, //when successful the api gives us the user details, send the payload to us
})

export const updateMovieFailure = () => ({
    type: "UPDATE_MOVIE_FAILURE",
})



