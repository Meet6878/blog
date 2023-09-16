import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material"

import toast from "react-hot-toast";
const CreateBlog = () => {
    const id = localStorage.getItem("userId");
    const navigete = useNavigate();
    const [input, setInputs] = useState({
        title: "",
        discription: "",
        image: "",

    });
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/blog/create-blog", {
                title: input.title,
                discription: input.discription,
                image: input.image,
                user: id,
            });

            if (data?.success) {
                toast.success("blog created")
                navigete("/my-blogs")
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box width={"50%"} border={3} borderRadius={10} padding={3} margin="auto" boxShadow={'10px 10px 20px #ccc'} display="flex" flexDirection={"column"} marginTop={"30px"}>
                    <Typography variant='h2' textAlign={"center"} fontWeight="bold" padding={3} color="gery">Create a post </Typography>
                    <InputLabel sx={{ mb: 1, my: 2, fontSize: "24px", fontWeight: "bold" }}>Title</InputLabel>
                    <TextField variant="filled" name='title' required value={input.title} onChange={handleChange} margin='normal' />

                    <InputLabel sx={{ mb: 1, my: 2, fontSize: "24px", fontWeight: "bold" }}>Description</InputLabel>
                    <TextField variant="filled" required name='discription' value={input.discription} onChange={handleChange} margin='normal' />

                    <InputLabel sx={{ mb: 1, my: 2, fontSize: "24px", fontWeight: "bold" }}>Image Url</InputLabel>
                    <TextField variant="filled" required name='image' value={input.image} onChange={handleChange} margin='normal' />
                    <Button type='submit' color='primary' variant="contained">submit</Button>
                </Box>
            </form>
        </>
    )
}

export default CreateBlog
