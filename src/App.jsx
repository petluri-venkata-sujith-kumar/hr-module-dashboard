import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider,  } from 'react-router-dom';
import Sidebar from './component/Sidebar';
import Batches from './component/Pages/batchs/Batches';
import EmpCardDetails from './component/Pages/empCard/EmpCardDetails';
import GetDetails from './component/Pages/empCard/singleEmpDetails/GetDetails';
import PageNotFound from './component/Pages/PageNotFound';
import Login from "./component/login/Login";
import Layout from "./component/layout/Layout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import Attendance from "./pages/attendance/Attendance";
import TimeSheet from "./pages/timesheet/TimeSheet";
import Logout from "./pages/Logout";
import BatchContainer from "./pages/batches/BatchContainer";
import Dashboard from './component/Pages/Dashboard/Dasboard';

let router=createBrowserRouter([
  {
    path: "",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/batches",
        element: <BatchContainer />,
      },
      {
        path: "/attendance",
        element: <Attendance />,
      },
      {
        path: "/timesheet",
        element: <TimeSheet />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
    ],
  },
  {
    path:"/hrdashboard",
    element:<Sidebar/>,
    children:[
      {
        index:true,
        element:<Dashboard/>
      },
      {
        path:"batchs",
        element:<Batches/>
      },
      {
        path:"employee",
        element:<EmpCardDetails/>
      },
      {
        path:"employee/:userId",
        element:<GetDetails/>
      }
    ]
  },
  {
    path:"*",
    element:<PageNotFound/>
  }
])
const App = () => {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
};

export default App;