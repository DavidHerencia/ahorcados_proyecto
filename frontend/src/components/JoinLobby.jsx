import { useEffect } from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import loadbalancer from './config';


// todo:
// get a list of active lobbies from server
// show the list in a material ui table
// allow user to join a lobby by clicking on the join button
// create a new game when user joins a lobby
// set the lobby to inactive when user joins a lobby
// redirect user to the game page

export const JoinLobby = () => {
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (!loggedInUser) {
            window.location.href = "/login";
        }
    }, []);
    
    // get lobbies
    const [lobbies, setLobbies] = useState([]);
    useEffect(() => {
        const url = `${loadbalancer}:5001/lobby`;
        fetch(url).then((res) => {
            res.json().then((data) => {
                setLobbies(data);
            });
        });
    }, []);

    const disableLobby = async (lobby_id) => {
        await fetch(`${loadbalancer}:5001/lobby/` + lobby_id, {
            method: 'DELETE',
        })
    }

    // function to handle join lobby button
    const handleJoin = async (lobby_id) => {
        // get lobby info
        const lobbyResponse = await fetch(`${loadbalancer}:5001/lobby/` + lobby_id)
        const lobbyData = await lobbyResponse.json();
        if (lobbyData.active === 0) {
            alert('Attempting to access inactive lobby');
            return;
        }

        // get 2 random words
        const wordResponse = await fetch(`${loadbalancer}:5003/word`)
        const wordData = await wordResponse.json();
        if (wordData.length < 2) {
            alert('Not enough words in database');
            return;
        }

        // randomize which word goes to which player from wordData
        const word1 = wordData[Math.floor(Math.random() * wordData.length)].word;
        const word2 = wordData[Math.floor(Math.random() * wordData.length)].word;
        console.log(word1, word2);

        fetch(`${loadbalancer}:5002/game`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'id': lobby_id,
                'player1_id': lobbyData.player_id,
                'player2_id': localStorage.getItem('userID'),
                'word1': word1,
                'word2': word2,
            }),
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            if (data === 'SUCCESS') {
                // set lobby to inactive
                disableLobby(lobby_id);
                // redirect to game page
                window.location.href = "/game/" + lobby_id;
            }
        });
    }

    // material ui table
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: 800,
            margin: 'auto',
            marginTop: 5,
            padding: 3,
            flexShrink: 1,
        }}>
            <h1>Join a Lobby</h1>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Lobby ID</TableCell>
                            <TableCell>Lobby Name</TableCell>
                            <TableCell>Player ID</TableCell>
                            <TableCell>Join</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lobbies.map((lobby) => (
                            <TableRow key={lobby.id}>
                                <TableCell>{lobby.id}</TableCell>
                                <TableCell>{lobby.name}</TableCell>
                                <TableCell>{lobby.player_id}</TableCell>
                                <TableCell><Button variant="outlined" onClick={() => handleJoin(lobby.id)}>Join</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Box>
    );
}
