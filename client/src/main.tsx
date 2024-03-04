import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Login from './components/Login.tsx'
import Register from './components/Register.tsx'
import DashBoard from './components/DashBoard.tsx'
import AllTodo from './components/AllTodo.tsx'
import AddTodo from './components/AddTodo.tsx'
import Search from './components/Search.tsx'

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <DashBoard />,
    children: [
      {
        index: true,
        element: <AllTodo />,
      },
      {
        path: "/dashboard/addTodo",
        element: <AddTodo />,
      },
      {
        path : "/dashboard/search",
        element : <Search />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(

 
    <RouterProvider router={BrowserRouter} />
 
)
