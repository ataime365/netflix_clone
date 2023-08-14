import { useContext, useRef } from "react";
import "./login.scss";
import { loginCall } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";

export default function Login() {
  const email = useRef()
  const password = useRef()

  // destructuing of objects
  const { dispatch} = useContext(AuthContext)

  const handleClick = (e) => {
    e.preventDefault() //To stop the page from acting like a default form
    // email.current.value
    loginCall({email: email.current.value, password: password.current.value}, dispatch)
  }

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input type="email" placeholder="Email or phone number" ref={email} />
          <input type="password" placeholder="Password" ref={password} />
          <button className="loginButton" onClick={handleClick}>Sign In</button>
          <span>
            New to Netflix? <b>Sign up now.</b>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
}