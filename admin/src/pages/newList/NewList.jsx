import "./newList.css"
import { useContext, useState, useEffect } from "react";
import { getMoviesCall } from "../../context/movieContext/apiCalls";
import { ListContext } from "../../context/listContext/ListContext";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { createListCall } from "../../context/listContext/apiCalls";
import { useNavigate } from "react-router-dom"

export default function NewList() {
  const [list, setList] = useState(null);

  const { dispatch } = useContext(ListContext)
  const { movies, dispatch:dispatchMovie } = useContext(MovieContext)
  const navigate = useNavigate()

  useEffect( ()=>{
    // Uses the MovieContext to send a request to the APi
    getMoviesCall(dispatchMovie)
    }, [dispatchMovie])

  const handleChange = (e) =>{
    const value = e.target.value
    setList({ ...list, [e.target.name]: value }) //This is where we use the 'name' from below
  }

  // console.log(movie)
  const handleSelect = (e) =>{
    // This is only for handling the multiple select
    // console.log(e.target.selectedOptions) // To see what we are selecting
    let value = Array.from(e.target.selectedOptions, (option) => option.value)
    setList({ ...list, [e.target.name]: value }) //Add this to the list
  }

  console.log(list)

  const handleSubmit = (e) =>{
    e.preventDefault()
    createListCall(list, dispatch)
    navigate("/lists")
  }

    return (
        <div className="newProduct">
          <h1 className="addProductTitle">New List</h1>
          <form className="addProductForm">
            {/* name is used for Form submission */}

            <div className="formLeft">
              <div className="addProductItem">
                <label>Title</label>
                <input type="text" placeholder="Popular movies" name="title" onChange={handleChange} />
              </div>
              <div className="addProductItem">
                <label>Genre</label>
                <input type="text" placeholder="action" name="genre" onChange={handleChange} />
              </div>
              <div className="addProductItem">
                <label>Type</label>
                <select name="type" onChange={handleChange}>
                  <option>Type</option>
                  <option value="movie">Movie</option>
                  <option value="series">Series</option>
                </select>
              </div>
            </div>

            <div className="formRight">
              <div className="addProductItem">
                <label>Content</label>
                <select multiple name="content" onChange={handleSelect} style={{height:"280px"}}>
                  {movies.map((movie) => (
                    <option key={movie._id} value={movie._id}>{movie.title}</option>
                  ))}
                </select>
              </div>
            </div>
            <button className="addProductButton" onClick={handleSubmit} >Create</button>

          </form>
        </div>
      );
    }