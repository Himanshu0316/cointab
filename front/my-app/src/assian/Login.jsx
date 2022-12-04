import { Container, FormControl, FormHelperText, FormLabel, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import styles from "./Main.module.css"
const Login = () => {
    const [data, setData] = useState({});
    const [datas, setDatas] = useState({});
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/auth";
            const res = await axios.post(url, data);
            const token = res.data.tdata;
            
             console.log(token)
            localStorage.setItem("token", token)
            localStorage.setItem("user",res.data.udata)
           
            alert(res.data.message)
            if (token) {
                navigate("/")
            }
            console.log(res.data.message)
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {

                setError(error.response.data.message);

            }
        }
    }
    const formSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/users";
            const res = await axios.post(url, datas);
            console.log(res)
            
        } catch (err) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    }
    const handleChange = (e) => {

        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        })
        console.log(data)
    }
    const inpChange = (e) => {

        const { name, value } = e.target;
        setDatas({
            ...datas,
            [name]: value,
        })
        console.log(datas)
    }

    return (
        <Container marginTop="50px">
            <form onSubmit={handleSubmit} className={styles.FormDiv}>
                <Text fontSize="2xl" align="center">SIGN IN</Text>
                <FormControl >
                    <FormLabel>Email address</FormLabel>
                    <Input name='email' onChange={handleChange} />
                </FormControl>
                <FormControl >
                    <FormLabel>Password</FormLabel>
                    <Input type='password' name='password' onChange={handleChange} />
                    <FormHelperText>Please fill password in small charechter.</FormHelperText>
                </FormControl>
                <Input marginBottom="20px" type='submit' className={styles.bTn} value="Submit" />

            </form>
            <form onSubmit={formSubmit} className={styles.FormDiv}>
                <Text fontSize="2xl" align="center">SIGN UP</Text>
                <FormControl >
                    <FormLabel>Email address</FormLabel>
                    <Input name='email' onChange={inpChange} />
                </FormControl>
                <FormControl >
                    <FormLabel>Password</FormLabel>
                    <Input type='password' name='password' onChange={inpChange} />
                    <FormHelperText>Please fill password in small charechter.</FormHelperText>
                </FormControl>
                <Input marginBottom="20px" type='submit' className={styles.bTn} value="Submit" />

            </form>
        </Container>
    )
}

export default Login
