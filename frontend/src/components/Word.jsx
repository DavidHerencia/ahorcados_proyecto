import React from "react";

export const Word = (props) => {
  const wordArray = props.wordArray;
  // big font size, letters spaced out, centerd
  const wordStyle = {
    fontSize: "6em",
    letterSpacing: "0.5em",
    textAlign: "center",
  };
  return (
    <div style={wordStyle}>
      {wordArray.map((letter) => (
        <span>{letter}</span>
      ))}
    </div>
  );
}


