import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Login />,
      }
    ]
  },
])


