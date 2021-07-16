import React from 'react';
import * as Tone from "tone";
import './Synth.css'


const Synth = () => {

    const synth = new Tone.Synth().toDestination();

    const playNote = (note) => {
        synth.triggerAttackRelease(`${note}4`, "8n")
    }

    return(
        <div className="synth">
            <div className="noteWrapper">
                <button className="note" onClick={() => playNote('C')}>
                    C
                </button>
                <button className="note" onClick={() => playNote('D')}>
                    D
                </button>
                <button className="note" onClick={() => playNote('E')}>
                    E
                </button>
                <button className="note" onClick={() => playNote('G')}>
                    G
                </button>
                <button className="note" onClick={() => playNote('A')}>
                    A
                </button>
            </div>

        </div>
    )
}

export default Synth;