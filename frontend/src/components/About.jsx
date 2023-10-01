import React from 'react';
import Typografy from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const About = () => {
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
            <Typografy sx={{
                fontWeight: 'bold',
                fontSize: 'clamp(1.2rem, 2.4vw, 3rem)',
                fontFamily: 'fantasy',
                textAlign: 'center',
                flexShrink: 1,
                marginTop: 3,
                color: '#1B2631'
            }}>
                Ahorcado VS
            </Typografy>

            <Typografy sx={{
                fontSize: 'clamp(1rem, 2vw, 2rem)',
                fontFamily: 'fantasy',
                textAlign: 'justify',
                flexShrink: 1,
                color: '#1B2631',
                marginBottom: '1rem', 
            }}>
                "Bienvenidos al juego del Ahorcado VS, una emocionante competencia en la que dos jugadores se enfrentan para adivinar una palabra antes que su oponente. Conviértete en el campeón del Ahorcado demostrando tus habilidades de deducción y agilidad mental.
            </Typografy>

            <Typografy sx={{
                fontSize: 'clamp(1rem, 2vw, 2rem)',
                fontFamily: 'fantasy',
                textAlign: 'justify',
                flexShrink: 1,
                color: '#1B2631',
                marginBottom: '1rem',
            }}>
                En este adictivo juego, los participanter dicen las letras del abecedario e intentan descubrir si están presentes en la palabra secreta en paralelo. Cada vez que una letra acertada se revela en su posición correcta, pero si se equivocan, una parte del cuerpo del personaje del ahorcado aparecerá. ¡Ten cuidado! Tendrás que usar tu ingenio y estrategia para evitar que el ahorcado se complete antes de adivinar la palabra o que tu oponente termine.
            </Typografy>

            <Typografy sx={{
                fontSize: 'clamp(1rem, 2vw, 2rem)',
                fontFamily: 'fantasy',
                textAlign: 'justify',
                flexShrink: 1,
                color: '#1B2631',
                marginBottom: '1rem',
            }}> 
                La diversión comienza cuando uno de los jugadores crea una partida y le da un nombre divertido. A continuación, se crea una contraseña para proteger la partida y el otro jugador se une a ella. Ambos deben estar listos y presionar el botón "listo" para comenzar la competencia.
            </Typografy>

            <Typografy sx={{
                fontSize: 'clamp(1rem, 2vw, 2rem)',
                fontFamily: 'fantasy',
                textAlign: 'justify',
                flexShrink: 1,
                color: '#1B2631',
                marginBottom: '1rem',
            }}>
                El juego del Ahorcado VS guarda un registro de los resultados, contabilizando cuántas veces cada jugador ha ganado, perdido o empatado. ¿Serás capaz de alcanzar la cima de la tabla de posiciones y convertirte en el maestro del Ahorcado?
            </Typografy>

            <Typografy sx={{
                fontSize: 'clamp(1rem, 2vw, 2rem)',
                fontFamily: 'fantasy',
                textAlign: 'justify',
                flexShrink: 1,
                color: '#1B2631',
                marginBottom: '1rem',
            }}>
                ¡Sumérgete en esta emocionante experiencia y desafía a tus amigos a adivinar las palabras más difíciles antes que tú! ¡El Ahorcado VS te espera para poner a prueba tu vocabulario y destreza mental!"
            </Typografy>

        </Box>
    );

}

