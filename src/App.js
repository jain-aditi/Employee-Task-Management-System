import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./containers/Login/Login";
import Register from "./containers/Login/Register";
import DashboardLayout from "./components/hoc/DashboardLayout/DashboardLayout";
import MyAccountPage from "./containers/MyAccountPage/MyAccountPage";
import PageNotFound from "./containers/PageNotFound/PageNotFound";
import ProjectPage from "./containers/ProjectPage/ProjectPage";
import UsersPage from "./containers/UsersPage/UsersPage";
import ViewTasks from "./containers/ViewTasks/ViewTasks";
import { setuser } from "./redux/RegisterRedux/RegisterActions";
import { auth } from "./services/FirebaseConfig";
import { getCookieStorage, removeCookieStorage, setCookieStorage } from "./utils/Cookies/Cookies";

function App() {
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (authUser) => {
    if (authUser) {
      setCookieStorage("user", authUser);
      dispatch(setuser(authUser));
    } else {
      removeCookieStorage("user");
      dispatch(setuser(null));
    }
  });

  useEffect(() => {
    dispatch(setuser(getCookieStorage("user")))
  }, [dispatch])
  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <DashboardLayout>
                <ViewTasks />
              </DashboardLayout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/myaccount"
            element={
              <DashboardLayout>
                <MyAccountPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/projects"
            element={
              <DashboardLayout>
                <ProjectPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/users"
            element={
              <DashboardLayout>
                <UsersPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/viewtasks"
            element={
              <DashboardLayout>
                <ViewTasks />
              </DashboardLayout>
            }
          />
          
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
