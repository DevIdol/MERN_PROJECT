import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPassword from "../Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "../Auth/ResetPassword/ResetPassword";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import MyProject from "../Components/MyProject/MyProject";
import NavBar from "../Components/NavBar/NavBar";
import Resume from "../Components/Resume/Resume";
import AllPost from "../Components/Blog/BlogPost/AllPost";
import ToolPost from "../Components/Blog/BlogPost/ToolPost";
import Blog from "../Components/Blog/Blog";
import EmailVerify from "../Components/EmailVerify/EmailVerify";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import AdminBlog from "../Admin/AdminBlog/AdminBlog";
import AdminDashboard from "../Admin/AdminDashboard/AdminDashboard";
import AdminSideBar from "../Admin/AdminSideBar";
import AdminSetting from "../Admin/AdminSetting/AdminSetting";
import BlogView from "../Components/Blog/BlogView";
import NewsPost from "../Components/Blog/BlogPost/NewsPost";
import SoftwarePost from "../Components/Blog/BlogPost/SoftwarePost";
import AddNewUser from "../Admin/AdminDashboard/AddNewUser";

const Router = () => {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Blog />}>
          <Route index element={<AllPost />} />
          <Route path="/blog/news" element={<NewsPost />} />
          <Route path="/blog/installation&tool" element={<ToolPost />} />
          <Route path="blog/software" element={<SoftwarePost />} />
          <Route path="blog/all/:id" element={<BlogView />} />
          <Route path="blog/news/:id" element={<BlogView />} />
          <Route path="blog/installation&tool/:id" element={<BlogView />} />
          <Route path="blog/software/:id" element={<BlogView />} />
        </Route>

        <Route path="project" element={<MyProject />} />
        <Route path="resume" element={<Resume />} />
        {user && (
          <Route path="admin/dashboard" element={<AdminSideBar />}>
            <Route index element={<AdminDashboard />} />
          </Route>
        )}
         {user && (
          <Route path="admin/dashboard/add-new-user" element={<AdminSideBar />}>
            <Route index element={<AddNewUser />} />
          </Route>
        )}
        {user && (
          <Route path="admin/blog" element={<AdminSideBar />}>
            <Route index element={<AdminBlog />} />
          </Route>
        )}
        {user && (
          <Route path="admin/account" element={<AdminSideBar />}>
            <Route index element={<AdminSetting />} />
          </Route>
        )}
        {!user && <Route path="login" element={<Login />} />}
        {!user && <Route path="register" element={<Register />} />}
        {!user && (
          <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
        )}
        {!user && <Route path="forgot-password" element={<ForgotPassword />} />}
        {!user && (
          <Route path="password-reset/:id/:token" element={<ResetPassword />} />
        )}

        <Route
          path="*"
          element={
            <h1
              style={{
                paddingTop: "200px",
                textAlign: "center",
              }}
            >
              404 URL Not Found!
            </h1>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
