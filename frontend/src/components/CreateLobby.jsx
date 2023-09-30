import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import loadbalancer from './config';

export const CreateLobby = () => {
    
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (!loggedInUser){
            window.location.href = '/login'; 
        }
    }, []);

    const [lobbyName, setLobbyName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(lobbyName);
        fetch(`${loadbalancer}:5001/lobby`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'name': lobbyName,
                'player_id': localStorage.getItem('userID'),
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.id) {
                window.location.href = '/waiting/' + data.id;
            } else {
                alert("Error creating lobby");
            }
        });
    };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 400,
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
            marginTop: 10,
            padding: 3,
            borderRadius: 5,
            boxShadow: "20px 20px 40px #000000",
            flexShrink: 1,
            backgroundColor: "#181a1b",
            ":hover": {
              boxShadow: "10px 10px 20px #000000",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: 40,
              padding: 3,
              fontWeight: "bold",
              color: "#fff",
              textAlign: "center",
            }}
          >
            Create a new Lobby!
          </Typography>
          <TextField
            type="text"
            value={lobbyName}
            onChange={({ target }) => setLobbyName(target.value)}
            id="outlined-helperText"
            label={<span style={{ fontWeight: "bold" }}>LOBBY NAME</span>}
            sx={{
              marginTop: 4,
              "& label": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
              "& input": {
                color: "white",
                fontWeight: 30,
                fontSize: 15,
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginTop: 3,
              borderRadius: 3,
              backgroundColor: "#ff1a29",
              width: "80%",
            }}
          >
            Create{" "}
          </Button>
        </Box>
      </form>
    </Box>
  );
};
