import './App.css';
import Header from './components/Header';
import { Routes, Route } from "react-router-dom";
import Blog from './pages/Blog';
import Login from './pages/Login';
import Register from './pages/Register';
import Userblogs from './pages/Userblogs';
import CreateBlog from "./pages/CreateBlogpage";
import BlogDetails from './pages/BlogDetails';
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path='/' element={<Blog />} />
        <Route path='/blogs' element={<Blog />} />
        <Route path='/my-blogs' element={<Userblogs />} />
        <Route path='/blog-details/:id' element={<BlogDetails />} />
        <Route path='/create-blog' element={<CreateBlog />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

      </Routes>
    </>


  );
}

export default App;
