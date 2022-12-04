import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'

import styles from "./Main.module.css"

import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate();
    const loginPath = () => {
        navigate("/login")
    }

    const getData = async () => { 
      const user = localStorage.getItem("user")
      setData(user)
    }

    useEffect(() => {
        getData()
    }, [])
    var token = localStorage.getItem("token");
    console.log(token)
    return token ? (
        <Box w="100%">


            <Text>{data}</Text>


        </Box>
    ) : (
        <Flex m="50px" p='2' direction="column" align="center"  >
            <Heading size='md'>If you want to see the content then first login</Heading>
            <Button className={styles.bTn} colorScheme='teal' onClick={loginPath}>Log in</Button>
        </Flex>
    )
}

export default Home
