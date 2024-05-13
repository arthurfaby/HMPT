import React, { useEffect } from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Register from './pages/auth/register/register';
import './App.css';
import Login from './pages/auth/login/login';
import Profile from './pages/profile/profile';
import { AuthStatus, useAuth } from "./hooks/useAuth"
import { Navigate } from "react-router-dom"


const router = createBrowserRouter([
  {
    path:'/register',
    element: <Register></Register>
  },
  {
    path:'/login',
    element: <Login></Login> 
  },
  {
    path:'/profile',
    element: <Profile></Profile>
  }
])


function App() {

    const { status, Authenticate } = useAuth()
    useEffect(() => { 
      Authenticate()
     })

  // const checkAuth = (nextState, replace) => {
  // if (status !== AuthStatus.Authenticated) {
  //     return <Navigate to="/login" replace />;
  //   } 
  // };
    

    return <RouterProvider router={router}/>
}

export default App;