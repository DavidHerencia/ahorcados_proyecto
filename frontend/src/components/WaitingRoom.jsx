import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const WaitingRoom = () => {
  const { id } = useParams();
  const [gameCreated, setGameCreated] = useState(false);

  useEffect(() => {
    // Polling function to check if the game is created
    const pollGameStatus = async () => {
      try {
        while (!gameCreated) {
          const response = await fetch(`${loadbalancer}:5002/game/${id}`);
          const gameData = await response.json();
          // check if not null
          if (gameData !== null) {
            // Game is created, redirect to game page
            console.log('Game created:', gameData);
            setGameCreated(true);
            window.location.href = `/game/${id}`;
          }
          // Wait for 1 second before polling again
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      } catch (error) {
        console.error('Error checking game status:', error);
        // Handle error or display error message to the user
      }
    };

    // Start polling for game status
    pollGameStatus();
  }, [id, gameCreated]);

  return (
    <div>
      <h1>Waiting for another player to join...</h1>
    </div>
  );
};
