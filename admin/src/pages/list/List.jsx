import "./list.css"
import { Link, useLocation } from "react-router-dom"
// import Chart from "../../components/chart/Chart"
// import { productData } from "../../dummyData"
// import { Publish } from "@mui/icons-material"


export default function List() {
    // Individual product page
    const { state } = useLocation()
    const { list } = state || {} //Getting the singular movie from the ProductList page using params.row
    // console.log(movie)

  return (
    <div className="product">
        <div className="productTitleContainer">
            <h1 className="productTitle">List</h1>
            <Link to="/newlist"> 
                <button className="productAddButton">Create</button>
            </Link>         
        </div>
        <div className="productTop">
            <div className="productTopRight">
                <div className="productInfoTop">
                    <span className="productName">{list.title}</span>
                </div>
                <div className="productInfoBottom">
                    <div className="productInfoItem">
                        <span className="productInfoKey">id:</span>
                        <span className="productInfoValue">{list._id}</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">genre:</span>
                        <span className="productInfoValue">{list.genre}</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">type:</span>
                        <span className="productInfoValue">{list.type}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="productBottom">
            <form className="productForm">
                <div className="productFormLeft">
                    <label>List Title</label>
                    <input type="text" placeholder={list.title} />
                    <label>Type</label>
                    <input type="text" placeholder={list.type} />
                    <label>Genre</label>
                    <input type="text" placeholder={list.genre} />          
                </div>
                <div className="productFormRight">
                    <button className="productButton">Update</button>
                </div>
            </form>
        </div>
    </div>
  )
}
