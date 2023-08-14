import React from "react"
import "./topbar.css"
import { NotificationsNone, Language, Settings } from "@mui/icons-material";
import { useState } from "react";

export default function Topbar() {
    const myStorage = window.localStorage ; //persist user
    const [currentUser, setCurrentUser] = useState(myStorage.getItem("user")) //persist user //state used to be null //was just a username initially 
  
    const handleLogout = () =>{
        myStorage.removeItem("user")
        setCurrentUser(null)
      }
  return (
    <div className="topbar">
        <div className="topbarWrapper">
            <div className="topLeft">
                <span className="logo">BenAdmin</span>
            </div>
            <div className="topRight">
                <div className="topbarIconContainer">
                    <NotificationsNone />
                    <span className="topIconBadge">2</span>
                </div>
                <div className="topbarIconContainer">
                    <Language />
                    <span className="topIconBadge">2</span>
                </div>
                <div className="topbarIconContainer">
                    <Settings />
                </div>
                <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" 
                    alt="" className="topAvatar" />
                <button className="buttonLogout" onClick={handleLogout}>Log out</button>
            </div>
        </div>
    </div>
  )
}
