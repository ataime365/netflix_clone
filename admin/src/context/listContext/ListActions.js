

export const getListsStart = () => ({
    type: "GET_LISTS_START",
})

export const getListsSuccess = (lists) => ({
    type: "GET_LISTS_SUCCESS",
    payload: lists, //when successful the api gives us the user details, send the payload to us
})

export const getListsFailure = () => ({
    type: "GET_LISTS_FAILURE",
})


// Delete
export const deleteListStart = () => ({
    type: "DELETE_LIST_START",
})

export const deleteListSuccess = (id) => ({
    type: "DELETE_LIST_SUCCESS",
    payload: id, //when successful the api gives us the user details, send the payload to us
})

export const deleteListFailure = () => ({
    type: "DELETE_LIST_FAILURE",
})


//Create
export const createListStart = () => ({
    type: "CREATE_LIST_START",
})

export const createListSuccess = (list) => ({
    type: "CREATE_LIST_SUCCESS",
    payload: list, //when successful the api gives us the user details, send the payload to us
})

export const createListFailure = () => ({
    type: "CREATE_LIST_FAILURE",
})


//update
export const updateListStart = () => ({
    type: "UPDATE_LIST_START",
})

export const updateListSuccess = (list) => ({
    type: "UPDATE_LIST_SUCCESS",
    payload: list, //when successful the api gives us the user details, send the payload to us
})

export const updateListFailure = () => ({
    type: "UPDATE_LIST_FAILURE",
})



