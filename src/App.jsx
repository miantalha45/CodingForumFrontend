import Home from "../components/Home";
import Threadlist from "../components/Threadlist";
import Thread from "../components/Thread";
import About from "../components/About";
import Navbar from "../components/Navbar";
import Login from "../components/Login";
import Foot from "../components/Foot";
import Signup from "../components/Signup";
import Contact from "../components/Contact";
import Search from "../components/Search";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Logout from "../components/Logout";

function App() {

  const router = new createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Home  />
          <Foot  />
        </>
      ),
    },
    {
      path: "/threadlist",
      element: (
        <>
          <Threadlist  />
          <Foot />
        </>
      ),
    },
    {
      path: "/thread",
      element: (
        <>
          <Thread />
          <Foot />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Signup />
        </>
      ),
    },
    {
      path: "/search",
      element: (
        <>
          <Search />
          <Foot />
        </>
      ),
    },
    {
      path: "/logout",
      element: (
        <>
          <Logout  />
          <Foot  />
        </>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
