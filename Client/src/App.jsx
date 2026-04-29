import React from "react";
import { Routes, Route } from "react-router-dom";
import Blog from "./Pages/Blog";
import Home from "./Pages/Home";
import Layout from "./Pages/admin/Layout";
import Dashboard from "./Pages/admin/Dashboard";
import AddBlogs from "./Pages/admin/AddBlogs";
import Comments from "./Pages/admin/Comments";
import ListBlog from "./Pages/admin/ListBlog";
import Login from "./components/admin/Login";
import 'quill/dist/quill.snow.css'
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";

const App = () => {

  const { token } = useAppContext();

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/admin" element={token ? <Layout/> : <Login/>}>
         <Route index element={<Dashboard />} />
         <Route path="addBlog" element={<AddBlogs />} />
         <Route path="comments" element={<Comments />} />
         <Route path="listBlogs" element={<ListBlog />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
