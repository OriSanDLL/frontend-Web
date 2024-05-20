import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';

// Auth and User Imports
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';

// Cart Imports
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';

// Admin Imports
import Dashboard from "./components/admin/Dashboard";
import ProductsList from "./components/admin/ProductsList";
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrdersList from './components/admin/OrdersList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews';

// Order Imports
import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/OrderDetails';

import ProtectedRoute from './components/route/ProtectedRoute';
import { loadUser } from './actions/userActions';
import store from './store'
import axios from 'axios';


import { useSelector } from "react-redux";

// payment
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


function App() {

  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey);
    }
    getStripeApiKey();
  }, [])

  const { user, loading } = useSelector((state) => state.auth);

 
  return (
    <Router>
      <div className="App">
        <Header />
        <div className='container container-fluid'>
          <Routes>
            <Route path="/" element={<Home />} exact="true" />
            <Route path="/search/:keyword" element={<Home />} exact="true" />
            <Route path="/product/:id" element={<ProductDetails />} exact="true" />
            <Route path="/login" element={<Login />} exact="true" />
            <Route path="/register" element={<Register />} exact="true" />
            <Route path="/password/forgot" element={<ForgotPassword />} exact="true" />
            <Route path="/password/reset/:token" element={<NewPassword />} exact="true" />
            <Route path="/cart" element={<Cart />} exact="true" />

            <Route path = "/orders/me" element={
              <ProtectedRoute>
                <ListOrders />
              </ProtectedRoute>} />
            <Route path = "/order/:id" element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>} />

            <Route path = "/success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />

            {stripeApiKey && 
              <Route path = '/payment'
                element={
                  <Elements stripe={loadStripe(stripeApiKey)} >
                    <ProtectedRoute>
                      <Payment />
                      </ProtectedRoute>
                  </Elements>}  />}

            
            <Route path="/me" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
            exact="true"/>

            <Route path="/me/update" element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
            exact="true"/>

            <Route path="/password/update" element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>
            }
            exact="true"/>

            <Route path="/shipping" element={
              <ProtectedRoute >
                <Shipping />
              </ProtectedRoute>
            }exact="true" />

            <Route path="/confirm" element={
              <ProtectedRoute >
                <ConfirmOrder />
              </ProtectedRoute>}
            />

          </Routes>
        </div>

        <Routes>

          <Route path="/dashboard" element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard />
            </ProtectedRoute>}/>

          <Route path="/admin/products" element={
						<ProtectedRoute isAdmin={true}>
							<ProductsList />
						</ProtectedRoute>}/>
          
          <Route path="/admin/product" element={
						<ProtectedRoute isAdmin={true}>
							<NewProduct />
						</ProtectedRoute>}/>
          
          <Route path="/admin/product/:id" element={
						<ProtectedRoute isAdmin={true}>
							<UpdateProduct />
						</ProtectedRoute>}/>

          <Route  path="/admin/orders" element={
						<ProtectedRoute isAdmin={true}>
							<OrdersList />
						</ProtectedRoute>}/>

          <Route path="/admin/order/:id" element={
						<ProtectedRoute isAdmin={true}>
							<ProcessOrder />
						</ProtectedRoute>}/>

          <Route path="/admin/users" element={
            <ProtectedRoute isAdmin={true}>
							<UsersList />
						</ProtectedRoute>}/>

          <Route path="/admin/user/:id" element={
						<ProtectedRoute isAdmin={true}>
							<UpdateUser />
						</ProtectedRoute>}/>

          <Route path="/admin/reviews" element={
						<ProtectedRoute isAdmin={true}>
							<ProductReviews />
						</ProtectedRoute>}/>

        

        </Routes>

        
        
        {!loading && user && user.role !== "admin" && <Footer />}
      </div>
    </Router>
  );
}

export default App;
