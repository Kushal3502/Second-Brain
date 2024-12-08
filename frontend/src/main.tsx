import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import Auth from "./pages/Auth.tsx";
import Signup from "./components/Signup.tsx";
import Signin from "./components/Signin.tsx";
import Home from "./components/Home.tsx";
import Tweet from "./components/Tweet.tsx";
import Video from "./components/Video.tsx";
import Document from "./components/Document.tsx";
import { UserProvider } from "./context/UserContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "tweet",
            element: <Tweet />,
          },
          {
            path: "video",
            element: <Video />,
          },
          {
            path: "documents",
            element: <Document />,
          },
        ],
      },
      {
        path: "auth",
        element: <Auth />,
        children: [
          {
            path: "signup",
            element: <Signup />,
          },
          {
            path: "signin",
            element: <Signin />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
