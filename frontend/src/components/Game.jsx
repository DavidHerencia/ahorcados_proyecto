import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AlphabetButtonArray } from "./AlphabetButtons";
import { Word } from "./Word";
import loadbalancer from './config';

// todo:
// 1. get the word, guesses, and lives from the server, based on the game id and player id
// 2. check if the game is over

const updatePlayer = async (id, num, outcome) => {
    let newWins = 0;
    let newDefeats = 0;
    let newTies = 0;
    if (outcome === 3) {
        newTies = 1;
    } else if (num === 1) {
        if (outcome === 1) {
            newWins = 1;
        } else if (outcome === 2) {
            newDefeats = 1;
        }
    } else if (num === 2) {
        if (outcome === 1) {
            newDefeats = 1;
        } else if (outcome === 2) {
            newWins = 1;
        }
    }
    const response = await fetch(`${loadbalancer}:5000/player/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            wins: newWins,
            defeats: newDefeats,
            ties: newTies
        })
    });
    const responseData = await response.text();
    console.log("player update response", responseData);
}


const updateOutcome = async (data, outcome) => {
  console.log("updating outcome", data, outcome);
  const response = await fetch(`${loadbalancer}:5002/game/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      outcome: outcome,
    }),
  });
  const responseData = await response.text();
  console.log("outcome update response", responseData);

  // update player stats
  updatePlayer(data.player1_id, 1, outcome);
  updatePlayer(data.player2_id, 2, outcome);

  if (responseData === "SUCCESS") {
    // redirect to game page
    window.location.href = "/game/" + data.id;
  }
};

export const Game = () => {
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      window.location.href = "/login";
    }
  }, []);

  const id = useParams().id;
  console.log("game id", id);
  const playerId = localStorage.getItem("userID").toString();

  const [game, setGame] = useState({
    word: "",
    guesses: "",
    lives: -1,
    state: -1,
  });

  useEffect(() => {
    const url = `${loadbalancer}:5002/game/${id}`;
    fetch(url).then((res) => {
      res.json().then((data) => {
        if (
          playerId !== data.player1_id.toString() &&
          playerId !== data.player2_id.toString()
        ) {
          console.log("not a player in this game");
          return (
            <div className="game">
              <h1>Not a player in this game</h1>
            </div>
          );
        } else if (playerId === data.player1_id.toString()) {
          setGame({
            word: data.word1,
            guesses: data.guesses1,
            lives: data.lives1,
            state: data.outcome,
          });
          console.log("joined as p1");
          console.log("game", game);
        } else {
          setGame({
            word: data.word2,
            guesses: data.guesses2,
            lives: data.lives2,
            state: data.outcome,
          });
          console.log("joined as p2");
          console.log("game", game);
        }
        // check if player1 has guessed all the letters
        for (let i = 0; i < data.word1.length; i++) {
          if (data.guesses1.indexOf(data.word1[i]) === -1) {
            break;
          } else if (i === data.word1.length - 1) {
            // local player has guessed all the letters
            if (data.outcome === 0) {
              // update game state to 1
              updateOutcome(data, 1);
            }
          }
        }
        // check if player2 has guessed all the letters
        for (let i = 0; i < data.word2.length; i++) {
          if (data.guesses2.indexOf(data.word2[i]) === -1) {
            break;
          } else if (i === data.word2.length - 1) {
            // local player has guessed all the letters
            if (data.outcome === 0) {
              // update game state to 2
              updateOutcome(data, 2);
            }
          }
        }
        // check if both players have run out of lives
        if (data.outcome === 0 && data.lives1 === 0 && data.lives2 === 0) {
          // update game state to 3
          updateOutcome(data, 3);
        }
      });
    });
  }, []);
  console.log("game", game);

  // Convert word to an array, modify it, and join it back to a string
  const wordArray = game.word.split("");
  for (let i = 0; i < wordArray.length; i++) {
    if (game.guesses.indexOf(wordArray[i]) === -1) {
      wordArray[i] = "_";
    }
  }

  // Display the guesses in a JSX list
  const guessesList = game.guesses
    .split("")
    .map((guess) => <li key={guess}>{guess}</li>);

  // display the lives (hangman image)
  // todo: display the hangman image

  if (game.lives === 0) {
    return (
      <div className="game">
        <h1>Game over! You ran out of lives. Better luck next time!</h1>
        <h2>Your word was {game.word}</h2>
      </div>
    );
  } else if (game.state === 0) {
    return (
      <div className="game">
        <h1>Game #{id}</h1>
        <Word wordArray={wordArray} />
        <h2>Guesses: {guessesList}</h2>
        <h2>Lives: {game.lives}</h2>
        <AlphabetButtonArray id={id} />
      </div>
    );
  } else if (game.state === 1) {
    return (
      <div className="game">
        <h1>Game over!</h1>
        <h2>Winner: Player1</h2>
      </div>
    );
  } else if (game.state === 2) {
    return (
      <div className="game">
        <h1>Game over!</h1>
        <h2>Winner: Player2</h2>
      </div>
    );
  } else if (game.state === 3) {
    return (
      <div className="game">
        <h1>Game over!</h1>
        <h2>Tie!</h2>
      </div>
    );
  }
};
