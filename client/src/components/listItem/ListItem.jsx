import { Add, PlayArrow, ThumbDownOutlined, ThumbUpAltOutlined } from "@mui/icons-material"
import "./listItem.scss"
import { useEffect, useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListItem({index, item}) {

  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  
  useEffect(()=>{
    const getMovie = async ()=>{
      try{
        const res = await axios.get(`movies/find/${item}`,
        {headers:{
          token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2FiODQyOWI5ZjNlZjc0MTc4ZjdjOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5MjAwODA4NSwiZXhwIjoxNjkyNDQwMDg1fQ.L4nrvXz1nuPwV_0Vnv9B3Sz339WgudapNvOZXUUDV9c"
        },}
        );
        setMovie(res.data)
      }catch(err){
        console.log(err)
      }
    }
    getMovie()
  }, [item]);
  // console.log(movie)

    return (
      // pathname //for sending object variables to a page
    <Link to={"/watch"} state={{movie}}> 
      <div className="listItem" 
              onMouseEnter={()=>setIsHovered(true)} 
              onMouseLeave={()=>setIsHovered(false)}
              // To center the hovering
              style={{left: isHovered && index * 225 - 50 - index * 2.5}}>
          <img
            src={movie.img}
            alt="" />

          {isHovered && (
            <>
              <video src={movie.trailer} autoPlay={true} loop />
              <div className="itemInfo">
                <div className="icons">
                  <PlayArrow className="icon" />
                  <Add className="icon" />
                  <ThumbUpAltOutlined className="icon" />
                  <ThumbDownOutlined className="icon" />
                </div>
                <div className="itemInfoTop">
                  <span>{movie.duration}</span>
                  <span className="limit">+{movie.limit}</span>
                  <span>{movie.year}</span>
                </div>
                <div className="desc">
                    {movie.desc}
                </div>
                <div className="genre">{movie.genre}</div>
              </div>
            </>
          )}
      </div>
    </Link>
  )
}
