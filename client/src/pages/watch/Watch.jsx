import { ArrowBackOutlined } from "@mui/icons-material"
import "./watch.scss"
import { Link, useLocation } from "react-router-dom"


export default function Watch() {

  const { state } = useLocation();
  console.log(state)
  const { movie } = state || {};  //stackoverflow

  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
            <ArrowBackOutlined />
            Home
        </div>
        <video className="video" autoPlay progress controls src={movie?.video}/>
      </Link>
    </div>
  )
}
