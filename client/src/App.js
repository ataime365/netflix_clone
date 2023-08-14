import { useContext } from "react";
import "./app.scss"
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import {BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./authContext/AuthContext";

function App() {
  const {user} = useContext(AuthContext)

  return (
    <div className="App">
      <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Navigate to="register" /> } />

        {user && (
          <>
            <Route path="/movies" element={ <Home type="movie" /> } />
            <Route path="/series" element={ <Home type="series" /> } />
            <Route path="/watch" element={ <Watch /> } />
          </>
        )}

        <Route path="/login" element={user ? <Navigate to="/" /> :  <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> :  <Register />} />
      </Routes>
      </Router>
    </div>
  );
}


export default App;
