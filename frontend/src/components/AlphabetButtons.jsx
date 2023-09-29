import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export const AlphabetButtonArray = (props) => {
  const id = props.id;
  const playerId = localStorage.getItem("userID").toString();
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const handleLetterClick = async (letter) => {
    const response = await fetch(`${loadbalancer}:5002/${id}`);
    const gameData = await response.json();

    let label = "";
    let newGuesses = "";
    if (playerId === gameData.player1_id.toString()) {
        label = 'guesses1'
        newGuesses = gameData.guesses1 + letter
    } else if (playerId === gameData.player2_id.toString()) {
        label = 'guesses2'
        newGuesses = gameData.guesses2 + letter
    }
    console.log(JSON.stringify({ [label]: newGuesses }));
    fetch(`${loadbalancer}:5002/game/${id}/guess`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            [label]: newGuesses
        })
    })
    .then((response) => response.text())
    .then((data) => {
        console.log(data);
        if (data === "SUCCESS") {
            // redirect to game page
            window.location.href = "/game/" + id;
        }
    });
  };

  // grid style: centered child buttons
  const boxStyle = {
    display: "flex",
    justifyContent: "center",
  };

  return (
    <Box style={boxStyle}>
      {alphabet.split("").map((letter, index) => (
        <Grid item key={index} spac>
          <Button variant="contained" onClick={() => handleLetterClick(letter)} sx={{ mr: 1 }}>
            {letter}
          </Button>
        </Grid>
      ))}
    </Box>
  );
};

