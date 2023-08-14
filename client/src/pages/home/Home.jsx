import "./home.scss"
import Featured from "../../components/featured/Featured"
import Navbar from "../../components/navbar/Navbar"
import List from "../../components/list/List"
import { useState, useEffect } from "react"
import axios from "axios";


export default function Home({ type }) {
  const [lists, setLists] = useState([])
  const [genre, setGenre] = useState(null)

  useEffect( ()=>{
    const getRandomLists = async () => {
      try{ //if type, if genre
        const res = await axios.get(
          `/lists${type ? "?type="+type : ""}${genre ? "&genre="+genre : ""}`,
          {headers:{
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2FiODQyOWI5ZjNlZjc0MTc4ZjdjOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5MjAwODA4NSwiZXhwIjoxNjkyNDQwMDg1fQ.L4nrvXz1nuPwV_0Vnv9B3Sz339WgudapNvOZXUUDV9c"
          },}
          ) //?userId=${post.userId}  //query example
        setLists(res.data)
      } catch(err){
          console.log(err)
      }
    }
  
    getRandomLists()
  }, [type, genre])


  // console.log(lists)
  return (
    <div className="home">
        <Navbar />
        <Featured type={type} setGenre={setGenre} />
        <List />

        {lists.map( (list) => (
            <List key={list._id} list ={list}  /> //passing props down
                )    //we have to use key when using map
        ) }
    </div>
  )
}
