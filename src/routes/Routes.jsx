import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Rooms from "../pages/Rooms";
import Singup from "../pages/Singup";
import PasswordChange from "../pages/PasswordChange";
import RoomDetails from "../pages/RoomDetails";
import UserProfile from "../pages/UserProfile";
import MyReserved from "../pages/MyReserved";
import RoometRequest from "../pages/RoometRequest";
import MyRequest from "../pages/MyRequest";
import Sort from "../pages/Sort";
import Admin from "../layout/Admin";
import AddRoom from "../pages/Admin/AddRoom";
import EditRoom from "../pages/Admin/EditRoom";
import Manage from "../pages/Admin/Manage";
import Payment from "../pages/Payment";
import Review from "../pages/Review";
import MyReview from "../pages/MyReview";
import PraviteRoutes from "./PraviteRoutes";
import AdminProtecd from "./AdminProtecd";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/Home",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/singup",
        element: <Singup />,
      },
      {
        path: "/rooms",
        element: <Rooms />,
      },
      {
        path: "/password",
        element:<PraviteRoutes><PasswordChange /></PraviteRoutes> 
      },
      {
        path: "/details/:id",
        element:<PraviteRoutes><RoomDetails /></PraviteRoutes> 
      },
      {
        path: "/reserved",
        element: <PraviteRoutes><MyReserved /></PraviteRoutes>
      },
      {
        path: "/RoomtRequest",
        element: <PraviteRoutes><RoometRequest /></PraviteRoutes>
      },
      {
        path: "/roomentmy",
        element: <PraviteRoutes><MyRequest></MyRequest>,</PraviteRoutes>
      },
      {
        path: "/sort",
        element: <Sort />,
      },
      {
        path: "/profile",
        element: <PraviteRoutes><UserProfile></UserProfile></PraviteRoutes>
      },
     {
        path: "/payment",
        element: <PraviteRoutes><Payment/></PraviteRoutes>
      },
       {
        path: "/review",
        element: <PraviteRoutes> <Review/></PraviteRoutes>
      },
       {
        path: "/reviemy",
        element: <PraviteRoutes><MyReview/></PraviteRoutes>
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminProtecd><Admin /></AdminProtecd>,
    children: [
      {
        path: "addroom",
        element: <AddRoom />,
      },
      {
        path: "edit-room/:room_id",
        element: <EditRoom />,
      },
      {
        path: "manageRoom",
        element: <Manage />,
      },
    ],
  },
]);
export default router;
