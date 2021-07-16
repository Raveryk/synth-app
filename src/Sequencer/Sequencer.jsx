import React, { useState } from "react";
import * as Tone from "tone";
import "./Sequencer.css";

// function to create 5X8 Grid
// with notes for the sequencer
const gridGenerator = () => {
  const grid = [];
  for (let i = 0; i < 8; i++) {
    let column = [
      { note: "A", isActive: false },
      { note: "G", isActive: false },
      { note: "E", isActive: false },
      { note: "D", isActive: false },
      { note: "C", isActive: false },
    ];
    grid.push(column);
  }
  return grid;
};

const CHOSEN_OCTAVE = "4";

const Sequencer = () => {
  const [grid, setGrid] = useState(gridGenerator());

  // boolean to handle if music is played or not
  const [playing, setPlaying] = useState(false);

  // helps visualize which column is making sound
  const [currentColumn, setCurrentColumn] = useState(null);

  // Built in function for multiple notes to be played at once
  const synth = new Tone.PolySynth().toDestination();

  const handleNoteClick = (clickedColumn, clickedNote) => {
    let updatedGrid = grid.map((column, columnIndex) =>
      column.map((note, noteIndex) => {
        let noteCopy = note;

        if (columnIndex === clickedColumn && noteIndex === clickedNote) {
          noteCopy.isActive = !note.isActive;
        }

        return noteCopy;
      })
    );

    setGrid(updatedGrid);
  }

  

  return <div></div>;
};

export default Sequencer;
