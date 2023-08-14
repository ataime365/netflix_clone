import { useContext, useState } from "react"
import "./navbar.scss"
import {ArrowDropDown, Notifications, Search } from "@mui/icons-material"
import { Link } from "react-router-dom"
import { AuthContext } from "../../authContext/AuthContext";
import { Logout } from "../../authContext/AuthActions";

export default function Navbar() {
//   const myStorage = window.localStorage ;
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch } = useContext(AuthContext)

//   const [currentUser, setCurrentUser] = useState(myStorage.getItem("user")) //persist user //state used to be null //was just a username initially 

  window.onscroll = () =>{
    setIsScrolled(window.pageYOffset ===0 ? false: true);
    return () => window.onscroll = null
  }

//   console.log(isScrolled)

    // const handleLogout = () =>{
    //     myStorage.removeItem("user")
    //     setCurrentUser(null)
    // }

  return (
    <div className={ isScrolled ? "navbar scrolled" : "navbar" }>
        <div className="container">
            <div className="left">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                    alt="" />
                <Link to={`/`} className="link" >
                    <span>Homepage</span>
                </Link>
                <Link to={`/series`} className="link" >
                    <span className="navbarmainLinks">Series</span>
                </Link>
                <Link to={`/movies`} className="link" >
                    <span className="navbarmainLinks">Movies</span>
                </Link>
                <span>New and Popular</span>
                <span>My List</span>
            </div>
            <div className="right">
                <Search className="icon"/>
                <span>KID</span>
                <Notifications className="icon"/>
                <img
                    src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt="" />
                <div className="profile">
                    <ArrowDropDown className="icon"/>
                    <div className="options">
                        <span>Settings</span>
                        <span onClick={()=>dispatch(Logout()) }>Logout</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
