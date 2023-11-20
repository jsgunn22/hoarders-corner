import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import AllCommunities from "./pages/AllCommunities.jsx";
import MyCommunities from "./pages/MyCommunities.jsx";
import Messages from "./pages/Messages.jsx";
import ItemsCommunity from "./pages/ItemsCommunity.jsx";
import MyItemsCommunity from "./pages/MyItemsCommunity.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Uh Oh!</h1>, // this can be replaced with an error page
    children: [
      {
        index: true,
        element: <AllCommunities />,
      },
      {
        path: "/messages/received",
        element: <Messages />,
      },
      {
        path: "/messages/sent",
        element: <Messages />,
      },
      {
        path: "my-communities",
        element: <MyCommunities />,
      },
      {
        path: "/itemscommunity",
        element: <ItemsCommunity />,
      },
      {
        path: "myitemscommunity",
        element: <MyItemsCommunity />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
