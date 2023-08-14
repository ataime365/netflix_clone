
export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",
})

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user, //when successful the api gives us the user details, send the payload to us
})

export const LoginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload: error
})

// Logout

export const Logout = () => ({
    type: "LOGOUT",
})