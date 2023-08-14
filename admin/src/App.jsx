import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css"
import Home from "./pages/home/Home";
import {BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";
import ListList from "./pages/listList/ListList";
import List from "./pages/list/List";
import NewList from "./pages/newList/NewList";



function App() {

  const { user } = useContext(AuthContext)

  return (

    <Router>
      <Topbar />
      <div className="container">

          <Sidebar />

          <Routes>
            <Route path="/login" element={user ? <Navigate to="/" /> :  <Login/> } />

            {user && ( 
            <>
                <Route exact path="/" element={<Home />} />
                <Route path="/users" element={ <UserList /> } />
                <Route path="/newUser" element={ <NewUser /> } />
                <Route path="/user/:userId" element={<User />} />
                <Route path="/movies" element={<ProductList />} />
                <Route path="/product/:productId" element={<Product />} />
                <Route path="/newproduct" element={<NewProduct />} />

                <Route path="/lists" element={<ListList />} />
                <Route path="/list/:listId" element={<List />} />
                <Route path="/newlist" element={<NewList />} />
            </>
            )}

            {/* <Route path="/register" element={user ? <Navigate to="/" /> :  <Register />} /> */}
          </Routes>
        

      </div>
    </Router>
  );
}


export default App;
