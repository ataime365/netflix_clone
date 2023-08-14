import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@mui/icons-material"
import "./list.scss"
import { useRef, useState } from "react"
import ListItem from "../listItem/ListItem"

export default function List( { list } ) {

  const [slideNumber, setSlideNumber] = useState(0);
  const [isMoved, setIsMoved] = useState(false);
  const [clickLimit, setClickLimit] = useState(window.innerWidth / 230 ) //230px is out ListItem width

  const listRef = useRef()

  const handleClick = (direction)=>{
    // Slider Logic
    setIsMoved(true) //optional
    let distance = listRef.current.getBoundingClientRect().x - 50 //Helps get the distance of the element 'container' from the left
    if (direction === "left" && slideNumber > 0){
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translate(${230 + distance}px)`;
    }
    if (direction ==="right" && slideNumber < 10 - clickLimit ){
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translate(${-230 + distance}px)`;
    }
    // console.log(distance)
    // console.log(slideNumber)
  }

  return (
    <div className="list">
        <span className="listTitle">{list?.title}</span>
        <div className="wrapper">
          <ArrowBackIosOutlined className="sliderArrow left" 
                  onClick={()=>{handleClick("left")}} style={{display: !isMoved && "none"}} />

            <div className="container" ref={listRef}>
              {list?.content.map((item, i) => (
                <ListItem key={i} index={i} item={item} />

              ))}

            </div>
          <ArrowForwardIosOutlined className="sliderArrow right" onClick={()=>{handleClick("right")}} />
        </div>
    </div>
  )
}
