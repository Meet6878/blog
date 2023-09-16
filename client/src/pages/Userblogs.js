import React, { useState, useEffect } from 'react'
import axios from 'axios';
import BlogCard from '../components/BlogCard';
const Userblogs = () => {
    const [blogs, setBlogs] = useState([]);
    const getUserBlocgs = async () => {
        try {
            const id = localStorage.getItem("userId")
            const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
            if (data?.success) {
                setBlogs(data?.userBlog.blogs);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getUserBlocgs();
    }, [])
    return (
        <div>
            {blogs && blogs.length > 0 ? (
                blogs.map((blog) => (
                    <BlogCard
                        id={blog._id}
                        isUser={true}
                        title={blog.title}
                        discription={blog.discription}
                        image={blog.image}
                        username={blog.user.username}
                        time={blog.createdAt}
                    />
                ))
            ) : (
                <h1>You Havent Created a blog</h1>
            )}
        </div>
    );
};

export default Userblogs
