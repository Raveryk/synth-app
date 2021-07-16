import React, { useState } from "react";
import * as Tone from "tone";
import "./Sequencer.css";
import classNames from "classnames";


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

  const PlayMusic = async () => {
      // variable to store notes
      let music = [];

      grid.map((column) => {
          let columnNotes = [];
          column.map((shouldPlay) => 
          shouldPlay.isActive &&
          columnNotes.push(shouldPlay.note + CHOSEN_OCTAVE)
          );
          music.push(columnNotes);
      });
      // starts Tone context
      await Tone.start()

      const Sequencer = new Tone.Sequence((time, column) => {
          // highlight column w/ styling
          setCurrentColumn(column)

        // Sends the active note to our PolySynth
          synth.triggerAttackRelease(music[column], "8n", time);
      }, [0, 1, 2, 3, 4, 5, 6, 7],
      "8n"
      );

      if (playing) {
        // Turns off player if currently playing
        setPlaying(false);
        setCurrentColumn(null);

        await Tone.Transport.stop();
        await Sequencer.stop();
        await Sequencer.clear();
        await Sequencer.dispose();

        return
      }

      setPlaying(true);
      // toggles playback of the tune
      await Sequencer.start();
      await Tone.Transport.start();
  }

  const NoteButton = ({ note, isActive, ...rest}) => {
      const classes = isActive ? "note note--active" : "note";
      return (
          <button className={classes} {...rest}>
              {note}
          </button>
      )
  }

  return (
      <div className="synth">
          <div className="note-wrapper">
              {grid.map((column, columnIndex) => (
                  <div
                    className={classNames("note-column", {
                        "note-column--active": currentColumn === columnIndex
                    })}
                    key={columnIndex + "column"}
                    >
                        {column.map(({ note, isActive }, noteIndex) => (
                            <NoteButton
                                note={note}
                                isActive={isActive}
                                onClick={() => handleNoteClick(columnIndex, noteIndex)}
                                key={note + columnIndex}
                                />
                        ))}
                        </div>
              ))}
          </div>
          <button className="play-button" onClick={() => PlayMusic()}>
              {playing ? "Stop" : "Play"}
          </button>
      </div>
  );
};

export default Sequencer;
