import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import Home from '../src/pages/Home/index'
import Profile from '../src/pages/Profile/index'
import Register from '../src/pages/Register/index'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/profile",
        element: <Profile />
      },

    ]
  },
  {
    path: "/",
    element: <Login />,
  }
])


