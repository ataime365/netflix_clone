import "./widgetSm.css"
import { Visibility } from "@mui/icons-material"
import { useEffect, useState } from "react"
import axios from "axios"

export default function WidgetSm() {
    const [newUsers, setNewusers] = useState([])

    useEffect(()=>{
        const getNewUsers = async ()=>{ //The urls have a query
            try{
                const res = await axios.get("users?new=true",
                {headers:{
                  token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2FiODQyOWI5ZjNlZjc0MTc4ZjdjOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5MjAwODA4NSwiZXhwIjoxNjkyNDQwMDg1fQ.L4nrvXz1nuPwV_0Vnv9B3Sz339WgudapNvOZXUUDV9c"
                },})
                setNewusers(res.data)
            }catch(err){
                console.log(err)
            }
        }
        getNewUsers()
    }, [])
    console.log(newUsers)

  return (
    <div className="widgetSm">
        <span className="widgetSmTitle">New Join Members</span>
        <ul className="widgetSmList">
            {newUsers.map((user)=>(
                    <li className="widgetSmListItem">
                    <img src={user.profilePicture || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"}
                    alt="" className="widgetSmImg" />
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">{user.username}</span>
                        {/* <span className="widgetSmUserTitle">Software Engineer</span> */}
                    </div>
                    <button className="widgetSmButton">
                        <Visibility className="widgetSmIcon" />
                        Display
                    </button>
                </li>
            ))}

        </ul>
    </div>
  )
}
