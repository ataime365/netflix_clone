import "./listList.css"
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material"
import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { ListContext } from "../../context/listContext/ListContext";
import { deleteListCall, getListsCall } from "../../context/listContext/apiCalls";


export default function ListList() {

  const {lists, dispatch} = useContext(ListContext) //Gets all movies list

  useEffect( ()=>{
    // Uses the MovieContext to send a request to the APi
    getListsCall(dispatch)
    }, [dispatch])

  const handleDelete = (id) => {
    // filter condition
    deleteListCall(id, dispatch)
  }

  // console.log(movies, "from movies lisssssst")

  const columns = [
    { field: '_id', headerName: 'ID', width: 250 },
    {field: 'title', headerName: 'title', width: 250 },
    {field: 'genre', headerName: 'Genre', width: 150 },
    {field: 'type', headerName: 'type', width: 120 },
    {field: 'action', headerName: 'Action', width: 150, renderCell: (params) =>{
        return (
            <>  
                <Link to={"/list/" + params.row._id} state={{list : params.row}}>
                    <button className="productListEdit">Edit</button>
                </Link>
                <DeleteOutline className="productListDelete" onClick={()=> handleDelete(params.row._id)} />
            </>
        )
    } },
    ];

  return (
    <div className="productList">
        <DataGrid rows={lists} columns={columns} disableRowSelectionOnClick 
            pageSize={8} 
            checkboxSelection
            getRowId={(r)=> r._id}
        />
    </div>
  )
}
