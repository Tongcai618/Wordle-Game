import './App.css';
import {useState} from "react";


function Grid({value}) {
    return (
        <div className={"grid"}>{value}</div>
    );
}

function Key({letter, onKeyClick}) {
    return (
        <button className={"key"} onClick={onKeyClick}>{letter}</button>
    )
}

function EnterKey({onEnterClick}) {
    return (
        <button className={"key enter-key"} onClick={onEnterClick}>Etr</button>
    )
}

function CancelKey({onCancelClick}) {
    return (
        <button className={"key cancel-key"} onClick={onCancelClick}>Cancel</button>
    )
}


function Board({squares}) {

    return (
        <>
            <div className={"board-row"}>
                <Grid value={squares[0]}/>
                <Grid value={squares[1]}/>
                <Grid value={squares[2]}/>
                <Grid value={squares[3]}/>
                <Grid value={squares[4]}/>
            </div>
            <div className={"board-row"}>
                <Grid value={squares[5]}/>
                <Grid value={squares[6]}/>
                <Grid value={squares[7]}/>
                <Grid value={squares[8]}/>
                <Grid value={squares[9]}/>
            </div>
            <div className={"board-row"}>
                <Grid value={squares[10]}/>
                <Grid value={squares[11]}/>
                <Grid value={squares[12]}/>
                <Grid value={squares[13]}/>
                <Grid value={squares[14]}/>
            </div>
            <div className={"board-row"}>
                <Grid value={squares[15]}/>
                <Grid value={squares[16]}/>
                <Grid value={squares[17]}/>
                <Grid value={squares[18]}/>
                <Grid value={squares[19]}/>
            </div>
            <div className={"board-row"}>
                <Grid value={squares[20]}/>
                <Grid value={squares[21]}/>
                <Grid value={squares[22]}/>
                <Grid value={squares[23]}/>
                <Grid value={squares[24]}/>
            </div>
            <div className={"board-row"}>
                <Grid value={squares[25]}/>
                <Grid value={squares[26]}/>
                <Grid value={squares[27]}/>
                <Grid value={squares[28]}/>
                <Grid value={squares[29]}/>
            </div>
        </>

    );
}

function KeyBoard({onPlay, handleCancel, handleEnter}) {
    function handleKeyClick(letter) {
        onPlay(letter);
    }

    function handleEnterClick() {
        console.log('Click enter button.');
        handleEnter();

    }

    function handleCancelClick() {
        console.log('Click cancel button.');
        handleCancel();
    }

    return (
        <>
            <div className={"key-row"}>
                <Key letter={'Q'} onKeyClick={() => handleKeyClick('Q')}/>
                <Key letter={'W'} onKeyClick={() => handleKeyClick('W')}/>
                <Key letter={'E'} onKeyClick={() => handleKeyClick('E')}/>
                <Key letter={'R'} onKeyClick={() => handleKeyClick('R')}/>
                <Key letter={'T'} onKeyClick={() => handleKeyClick('T')}/>
                <Key letter={'Y'} onKeyClick={() => handleKeyClick('Y')}/>
                <Key letter={'U'} onKeyClick={() => handleKeyClick('U')}/>
                <Key letter={'I'} onKeyClick={() => handleKeyClick('I')}/>
                <Key letter={'O'} onKeyClick={() => handleKeyClick('O')}/>
                <Key letter={'P'} onKeyClick={() => handleKeyClick('P')}/>
            </div>
            <div className={"key-row"}>
                <Key letter={'A'} onKeyClick={() => handleKeyClick('A')}/>
                <Key letter={'S'} onKeyClick={() => handleKeyClick('S')}/>
                <Key letter={'D'} onKeyClick={() => handleKeyClick('D')}/>
                <Key letter={'G'} onKeyClick={() => handleKeyClick('G')}/>
                <Key letter={'H'} onKeyClick={() => handleKeyClick('H')}/>
                <Key letter={'J'} onKeyClick={() => handleKeyClick('J')}/>
                <Key letter={'K'} onKeyClick={() => handleKeyClick('K')}/>
                <Key letter={'L'} onKeyClick={() => handleKeyClick('L')}/>
            </div>
            <div className={"key-row"}>
                <EnterKey onEnterClick={() => handleEnterClick()}/>
                <Key letter={'Z'} onKeyClick={() => handleKeyClick('Z')}/>
                <Key letter={'X'} onKeyClick={() => handleKeyClick('X')}/>
                <Key letter={'C'} onKeyClick={() => handleKeyClick('C')}/>
                <Key letter={'V'} onKeyClick={() => handleKeyClick('V')}/>
                <Key letter={'B'} onKeyClick={() => handleKeyClick('B')}/>
                <Key letter={'N'} onKeyClick={() => handleKeyClick('N')}/>
                <Key letter={'M'} onKeyClick={() => handleKeyClick('M')}/>
                <CancelKey onCancelClick={() => handleCancelClick()}/>
            </div>
        </>
    );
}

function Game() {

    const [history, setHistory] = useState(Array(30).fill(null));
    const [trial, setTrial] = useState(0);
    const currentTrial = history.slice(trial, trial + 5);
    const nonNullElementsCount = currentTrial.filter(element => element !== null).length;
    const isReady = nonNullElementsCount === 5 ? true : false; // If the current trial has non-null value, return false
    console.log(isReady);

    function handleKey(letter) {
        // Click the letter
        if (!isReady) {
            // If the current trial is not ready (not finished)
            const newCurrentTrial = [...currentTrial];
            // Find the first null entry in the history
            const nullIndex = currentTrial.findIndex((item) => item === null);
            // If there is an empty spot, fill it with the letter
            if (nullIndex !== -1) {
                newCurrentTrial[nullIndex] = letter;
                const newHistory = [...history];
                newHistory.splice(trial, 5, ...newCurrentTrial);
                setHistory(newHistory);
            }
            console.log(history);
        }
    }

    function handleEnter() {
        const currentAnswer = currentTrial.join('')
        if (isReady) {
            if (currentAnswer.toUpperCase() === "HAPPY") {
                // If the player win the game
                console.log("You Win!");
                return;
            }
            setTrial(trial + 5);

            if (trial === 25) {
                // If the player lose the game (they have tried all chances)
                console.log("You lose!")
            }
        }

    }

    function handleCancel() {
        // Create a new current trial list
        const newCurrentTrial = [...currentTrial];
        const newHistory = [...history];

        if (isReady) {
            // If the current trial is ready, delete the last element
            newCurrentTrial[newCurrentTrial.length - 1] = null;


        } else {
            // If the current trial is not ready, we find the element before the null value
            const nullIndex = newCurrentTrial.findIndex((item) => item === null);
            if (nullIndex > 0) {
                newCurrentTrial[nullIndex - 1] = null;
            }
        }
        // Update the current trial to the history
        newHistory.splice(trial, 5, ...newCurrentTrial);
        setHistory(newHistory);
    }

    return (
        <>
            <header>
                <div>Hey, how's it going? My friend~</div>
                <div>Do you want to try?</div>
                <div>Wordle Game</div>
            </header>

            <div className={"game"}>
                <div className={"game-board"}>
                    <Board squares={history}/>
                </div>
                <div className={"game-keyboard"}>
                    <KeyBoard onPlay={handleKey} handleCancel={handleCancel} handleEnter={handleEnter}/>
                </div>
            </div>
        </>
    );
}

export default Game;
