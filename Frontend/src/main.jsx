import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./Home.jsx"
import Hashes from './Hashes.jsx'
import Contact from './Contact.jsx'
import Landing from './Landing.jsx'
import Signin from './Signin.jsx'
import Login from './Login.jsx'
import Profile from './Profile.jsx'

const router = createBrowserRouter([
  {
    path : "/",
    element : <Landing />
  },
  {
    path : "/home",
    element : <Home />
  },
  {
    path : "/contact",
    element : <Contact />
  },
  {
    path: "/signin",
    element: <Signin />
  },
  {
    path : "/login",
    element : <Login />
  },
  {
    path : "/profile",
    element : <Profile />
  },
  {
    path : "/hashes",
    element : <Hashes />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
