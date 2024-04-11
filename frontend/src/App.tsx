import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Register from './pages/auth/register/register';
import './App.css';


const router = createBrowserRouter([
  {
    path:'/register',
    element: <Register></Register>
  }
])

function App() {
    return <RouterProvider router={router}/>
}

export default App;