import React, { useState, useEffect}from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typografy from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import { Link } from 'react-router-dom';

export const Register = () => {
    //comprueba si hay una sssion iniciada
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            alert("there is a session logged in, please log out first");
        }
    }, []);

    //constantes para guardar los datos del formulario
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //funcion que se ejecuta al enviar el formulario
    const handleSubmit = async (event) => {
        event.preventDefault();

        //fetch para enviar los datos al backend
        const response = await fetch(`${loadbalancer}:5000/player`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'username': username,
                'password': password,
            }),
        })

        //promesa que espera la respuesta del backend
        const data = await response.text();
        if (data === 'SUCCESS') {
            alert("User created successfully");
            window.location.href = '/login';      
        }
        else {
            alert("Username already exists");
        }
    };

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: 400,
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 'auto',
                    marginTop: 10,
                    padding: 3,
                    borderRadius: 5,
                    boxShadow: '20px 20px 40px #000000',
                    flexShrink: 1,
                    backgroundColor: '#181a1b',
                    ":hover": {
                        boxShadow: '10px 10px 20px #000000',
                    },
                    }}>

                    <Typografy sx={{fontSize: 40,
                                    padding: 3,
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    textAlign: 'center'
                        }}>
                        Sign up
                    </Typografy>

                    <TextField
                        type="text"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                        id="username"
                        label={<span style={{ fontWeight: 'bold' }}>USERNAME</span>}
                        sx={{
                            marginTop: 4,

                            width: '80%',
                            '& label': {
                                color: 'white',
                                zIndex: 0,
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'white',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'white',
                                },
                            },
                            '& input': {
                                color: 'white',
                                fontWeight: 30,
                                fontSize: 15,
                            },
                        }}
                    />

                    <TextField 
                        type="password"
                        value={password}
                        onChange = {({target}) => setPassword(target.value)}
                        id="password"
                        label={<span style={{ fontWeight: 'bold' }}>PASSWORD</span>}
                        sx={{
                            marginTop: 4,
                            width: '80%',
                            '& label': {
                                color: 'white',
                                zIndex: 0,
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'white',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'white',
                                },
                            },
                            '& input': {
                                color: 'white',
                                fontWeight: 30,
                                fontSize: 15,
                            },
                        }}
                    />
                    
                    <Button type="submit"
                        endIcon={<HowToRegOutlinedIcon />}
                        variant="contained" 
                        sx={{ marginTop: 3, 
                            borderRadius: 3, 
                            backgroundColor: '#1f73b7', 
                            width: '80%' }}>
                        Sign up 
                    </Button>

                    <Typografy sx={{marginTop: 3, color: '#fff'}}> Ya tiene una cuenta?</Typografy>
                    <Link to="/login"
                        style={{
                            textDecoration: 'none',
                            width: '80%',
                        }}>
                        <Button variant="outlined"
                            sx={{borderRadius: 3,
                                width: '100%'
                            }}>
                            CHANGE TO LOGIN
                        </Button>
                    </Link>
                </Box>
            </form>
        </Box>
    );
}
