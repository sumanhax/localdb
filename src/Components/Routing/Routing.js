import React, { lazy, Suspense } from 'react'
import { Routes,Route,BrowserRouter as Router } from 'react-router-dom'
import Registration from '../Registration/Registration'
import Login from '../Registration/Login'
import Headers from '../Layout/Headers'
import Profile from '../Registration/Profile'
import Products from '../Registration/Products'
// import ProductsFetch from '../Registration/ProductsFetch'
// import ProductDetails from '../Registration/ProductDetails'
import ProductEdit from '../Registration/ProductEdit'
import ProtectedRoute from '../IsAuth'
import Errors from '../Error/Errors'

let ProductsFetch=lazy(()=>import('../Registration/ProductsFetch'));
let ProductDetails=lazy(()=>import('../Registration/ProductDetails'))

const Routing = () => {
  return (
    <div>
        <Router>
            <Headers/>
            <Suspense fallback={<h1>Loading</h1>}>
            <Routes>
                <Route path='registration' element={<Registration/>} />
                <Route path='login' element={<Login/>} />
                <Route path='profile' element={<Profile/>} />

                {/* <Route element={<ProtectedRoute/>} > */}
                <Route path='profile/:id' element={<Profile/>} />
                {/* </Route> */}

                <Route path='products' element={<Products/>} />
                <Route path='productsfetch' element={<ProductsFetch/>} />
                <Route path='productsfetch/productdetails/:id' element={<ProductDetails/>} />
                <Route path='productsfetch/productedit/:id' element={<ProductEdit/>} />
                <Route path='errors' element={<Errors/>}/>
            </Routes>
            </Suspense>
        </Router>
    </div>
  )
}

export default Routing