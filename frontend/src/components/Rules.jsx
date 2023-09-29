import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export const Rules = () => {

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
            <Typography sx={{
                fontWeight: 'bold',
                fontSize: 'clamp(1.2rem, 2.4vw, 3rem)',
                fontFamily: 'fantasy',
                textAlign: 'center',
                flexShrink: 1,
                marginTop: 3,
                color: '#1B2631'
            }}>
                Ahorcado VS RULES 
            </Typography>

            <Typography sx={{
                fontSize: 'clamp(1rem, 2vw, 2rem)',
                fontFamily: 'fantasy',
                textAlign: 'justify',
                flexShrink: 1,
                color: '#1B2631',
                marginBottom: '1rem',
            }}>
                1. Dos jugadores compiten para adivinar una palabra antes que el otro.
            </Typography>

            <Typography sx={{
                fontSize: 'clamp(1rem, 2vw, 2rem)',
                fontFamily: 'fantasy',
                textAlign: 'justify',
                flexShrink: 1,
                color: '#1B2631',
                marginBottom: '1rem',
            }}>
                2. Cada participante cuenta con 6 vidas para adivinar la palabra.
            </Typography>

            <Typography sx={{
                fontSize: 'clamp(1rem, 2vw, 2rem)',
                fontFamily: 'fantasy',
                textAlign: 'justify',
                flexShrink: 1,
                color: '#1B2631',
                marginBottom: '1rem',
            }}>
                3. Los jugadores se turnan para decir letras del abecedario y descubrir si están en la palabra secreta.
            </Typography>

            <Typography sx={{
                fontSize: 'clamp(1rem, 2vw, 2rem)',
                fontFamily: 'fantasy',
                textAlign: 'justify',
                flexShrink: 1,
                color: '#1B2631',
                marginBottom: '1rem',
            }}>
                4. Si una letra adivinada está en la palabra, se revela en su posición correcta.
            </Typography>

            <Typography sx={{
                fontSize: 'clamp(1rem, 2vw, 2rem)',
                fontFamily: 'fantasy',
                textAlign: 'justify',
                flexShrink: 1,
                color: '#1B2631',
                marginBottom: '1rem',
            }}>
                5. Si una letra adivinada no está en la palabra, se dibuja una parte del cuerpo del personaje del ahorcado.
            </Typography>

            <Typography sx={{
                fontSize: 'clamp(1rem, 2vw, 2rem)',
                fontFamily: 'fantasy',
                textAlign: 'justify',
                flexShrink: 1,
                color: '#1B2631',
                marginBottom: '1rem',
            }}>
                6. Cada jugador continúa adivinando letras hasta que adivine la palabra o agote sus 6 vidas.
            </Typography>

            <Typography sx={{
                fontSize: 'clamp(1rem, 2vw, 2rem)',
                fontFamily: 'fantasy',
                textAlign: 'justify',
                flexShrink: 1,
                color: '#1B2631',
                marginBottom: '1rem',
            }}>
                7. Se guarda un registro de los resultados, contabilizando las veces que cada jugador ha ganado, perdido o empatado.
            </Typography>

            <Typography sx={{
                fontSize: 'clamp(1rem, 2vw, 2rem)',
                fontFamily: 'fantasy',
                textAlign: 'justify',
                flexShrink: 1,
                color: '#1B2631',
                marginBottom: '1rem',
            }}>
                8. El jugador que adivine primero la palabra secreta antes de perder sus 6 vidas gana la partida.
            </Typography>

            <Typography sx={{
                fontSize: 'clamp(1rem, 2vw, 2rem)',
                fontFamily: 'fantasy',
                textAlign: 'justify',
                flexShrink: 1,
                color: '#1B2631',
                marginBottom: '1rem',
            }}>
                9. Si algun jugador termina sin adivinar la palabra y agota sus 6 vidas, pero su contrincante aun tiene chance, será victoria del
                que aun tiene oportunidades.
            </Typography>

            <Typography sx={{
                fontSize: 'clamp(1rem, 2vw, 2rem)',
                fontFamily: 'fantasy',
                textAlign: 'justify',
                flexShrink: 1,
                color: '#1B2631',
                marginBottom: '1rem',
            }}>
                10. Los jugadores pueden crear partidas, protegerlas con contraseñas y unirse a partidas existentes.
            </Typography>

            <Typography sx={{
                fontSize: 'clamp(1rem, 2vw, 2rem)',
                fontFamily: 'fantasy',
                textAlign: 'justify',
                flexShrink: 1,
                color: '#1B2631',
                marginBottom: '1rem',
            }}>
                11. ¡Diviértete desafiando a tus amigos, usando tu ingenio y estrategia para evitar que el ahorcado se complete antes de adivinar la palabra!
            </Typography>

            </Box>
    );
}