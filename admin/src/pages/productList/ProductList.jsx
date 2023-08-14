import "./productList.css"
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material"
// import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { deleteMovieCall, getMoviesCall } from "../../context/movieContext/apiCalls";


export default function ProductList() {

//   const [data, setData] = useState(productRows)
  const {movies, dispatch} = useContext(MovieContext) //Gets all movies list

  useEffect( ()=>{
    // Uses the MovieContext to send a request to the APi
    getMoviesCall(dispatch)
    }, [dispatch])

  const handleDelete = (id) => {
    // filter condition
    deleteMovieCall(id, dispatch)
  }

  // console.log(movies, "from movies lisssssst")

  const columns = [
    { field: '_id', headerName: 'ID', width: 70 },
    { field: 'movie', headerName: 'Movie', width: 200, renderCell: (params) =>{
        return (
            <div className="productListItem">
                <img src={params.row.img} alt="" className="productListImg" />
                {params.row.title}
            </div>
        )
    } },
    {field: 'genre', headerName: 'Genre', width: 120 },
    {field: 'year', headerName: 'year', width: 120 },
    {field: 'limit', headerName: 'limit', width: 120 },
    {field: 'isSeries', headerName: 'isSeries', width: 120 },
    {field: 'action', headerName: 'Action', width: 150, renderCell: (params) =>{
        return (
            <>  
                <Link to={"/product/" + params.row._id} state={{movie : params.row}}>
                    <button className="productListEdit">Edit</button>
                </Link>
                <DeleteOutline className="productListDelete" onClick={()=> handleDelete(params.row._id)} />
            </>
        )
    } },
    ];

  return (
    <div className="productList">
        <DataGrid rows={movies} columns={columns} disableRowSelectionOnClick 
            pageSize={8} 
            checkboxSelection
            getRowId={(r)=> r._id}
        />
    </div>
  )
}
