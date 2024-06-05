import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AuthLayOuts from "../layout";
import Register from "../pages/Register";
import CheckEmailPage from "../pages/CheckEmailPage";
import CheckPassword from "../pages/CheckPassword";
import HomePage from "../pages/HomePage";
import MessagePage from "../components/MessagePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "register",
        element: (
          <AuthLayOuts>
            <Register />
          </AuthLayOuts>
        ),
      },
      {
        path: "email",
        element: (
          <AuthLayOuts>
            <CheckEmailPage />
          </AuthLayOuts>
        ),
      },
      {
        path: "password",
        element: (
          <AuthLayOuts>
            <CheckPassword />
          </AuthLayOuts>
        ),
      },
      {
        path: "",
        element: <HomePage />,
        children: [
          {
            path: ":userId",
            element: <MessagePage />,
          },
        ],
      },
    ],
  },
]);
export default router;
