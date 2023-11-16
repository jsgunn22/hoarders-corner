import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";

import Login from "./pages/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Uh Oh!</h1>, // this can be replaced with an error page
    children: [
      {
        index: true,
        element: <h1 className="text-h1 text-dan-5">Welcome to P3-G5</h1>,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
