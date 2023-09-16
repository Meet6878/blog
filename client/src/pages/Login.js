import React, { useState } from 'react'
import { Typography, Box, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import toast from "react-hot-toast";
import axios from "axios";
import { authActions } from "../redux/store";

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({

        email: "",
        password: "",
    }) 			//name field state
    //name field state
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/user/login", {

                email: inputs.email,
                password: inputs.password,
            });
            if (data.success) {
                localStorage.setItem("userId", data?.user._id);
                dispatch(authActions.login());
                toast.success("User login Successfully");
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }

    }
    return (
        <form onSubmit={handlesubmit}>


            <Box maxWidth={450} display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                margin={"auto"}
                marginTop={5}
                boxShadow="10px 10px 20px #ccc"
                padding={3}
                borderRadius={5}
            >
                <Typography variant="h4"
                    sx={{ textTransform: "uppercase" }}
                    padding={3}
                    textAlign={"center"}
                >Login</Typography>

                <TextField
                    placeholder="email"
                    name="email"
                    value={inputs.email}
                    onChange={handleChange}
                    margin='normal'
                    type='email'
                    required
                />
                <TextField
                    placeholder="password"
                    name="password"
                    value={inputs.password}
                    onChange={handleChange}
                    margin='normal'
                    type='password'
                    required
                />

                <Button
                    sx={{ borderRadius: 3, marginTop: 3, marginBottom: 1 }}
                    type='submit'
                    variant='contained'
                    color='primary'
                >Submit</Button>
                <Button
                    sx={{ borderRadius: 3, marginTop: 3, marginBottom: 1 }}
                    onClick={() => navigate("/register")}
                > Not a user ? Please Register</Button>
            </Box>
        </form>
    )
}

export default Login
