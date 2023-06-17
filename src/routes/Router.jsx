import { Navigate, Route, Routes } from "react-router-dom";
import ROUTES from "./ROUTES";
import PayloadProtectedRoute from "./protectedRoutes/Payload";
import LoggedProtectedRoute from "./protectedRoutes/Logged";
import HomePage from "../pages/Home";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LoginPage from "../pages/Login";
import ProfilePage from "../pages/Profile";
import FavoritesPage from "../pages/Favorites";
import MyCardsPage from "../pages/MyCards";
import SandboxPage from "../pages/SandboxPage/Sandbox";
import AboutPage from "../pages/About";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.FAKEHOME} element={<Navigate to={ROUTES.HOME} />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route
        path={ROUTES.PROFILE}
        element={<LoggedProtectedRoute element={<ProfilePage />} />}
      />
      <Route
        path={ROUTES.FAV}
        element={<LoggedProtectedRoute element={<FavoritesPage />} />}
      />
      <Route
        path={ROUTES.MYCARDS}
        element={
          <PayloadProtectedRoute
            isBiz={true}
            isAdmin={false}
            element={<MyCardsPage />}
          />
        }
      />
      <Route
        path={ROUTES.SANDBOX}
        element={
          <PayloadProtectedRoute
            isBiz={false}
            isAdmin={true}
            element={<SandboxPage />}
          />
        }
      ></Route>
      <Route
        path="*"
        element={
          <span>
            <h1>404</h1>
            <p>page not found</p>
          </span>
        }
      />
    </Routes>
  );
};

export default Router;
