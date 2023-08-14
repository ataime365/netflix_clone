import "./login.css";
import { useContext, useState } from "react";
import { loginCall } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {user, isFetching, error, dispatch} = useContext(AuthContext)

  const handleLogin = (e) =>{
    e.preventDefault() //To stop the page from reloading when the button is clicked or acting like a default form
    loginCall({email: email, password: password}, dispatch) 
  }

  return (
    <div className="login">
      <div className="container">
        <form className="loginForm">
          {/* <h1>Sign In</h1> */}
          <input type="email" placeholder="Email" className="loginInput" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="loginInput" onChange={(e) => setPassword(e.target.value)} />
          <button className="loginButton" onClick={handleLogin} disabled={isFetching}>Login</button>
        </form>
      </div>
    </div>
  );
}