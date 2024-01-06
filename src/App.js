import './App.css';
import hardWords from './words.json';
import simpleWords from './simpleWords.json'
import {useEffect, useState} from "react";
import {FaBackspace} from "react-icons/fa";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSyncAlt} from '@fortawesome/free-solid-svg-icons';
import wordleLogo from "./wordle-icon.png";

const Header = () => {
    return (
        <header className="header">
            <img src={wordleLogo} alt={"Wordle Logo"} className={"logo"}/>
            <div>Wordle Game</div>
            <nav className="navigation">
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
            </nav>
        </header>
    );
};


function Grid({value, color}) {
    let gridClass = `grid ${color}`;
    return (
        <div className={gridClass}>{value}</div>
    );
}

function Key({letter, onKeyClick, color}) {
    let keyClass = `key ${color}`
    return (
        <button className={keyClass} onClick={onKeyClick}>{letter}</button>
    )
}

function EnterKey({onEnterClick}) {
    return (
        <button className={"key enter-key"} onClick={onEnterClick}>✓</button>
    )
}

function CancelKey({onCancelClick}) {
    return (
        <button className={"key cancel-key"} onClick={onCancelClick}><FaBackspace/></button>
    )
}


function Board({squares, trialResults}) {

    return (
        <>
            <div className={"board-row"}>
                <Grid value={squares[0]} color={trialResults[0]}/>
                <Grid value={squares[1]} color={trialResults[1]}/>
                <Grid value={squares[2]} color={trialResults[2]}/>
                <Grid value={squares[3]} color={trialResults[3]}/>
                <Grid value={squares[4]} color={trialResults[4]}/>
            </div>
            <div className={"board-row"}>
                <Grid value={squares[5]} color={trialResults[5]}/>
                <Grid value={squares[6]} color={trialResults[6]}/>
                <Grid value={squares[7]} color={trialResults[7]}/>
                <Grid value={squares[8]} color={trialResults[8]}/>
                <Grid value={squares[9]} color={trialResults[9]}/>
            </div>
            <div className={"board-row"}>
                <Grid value={squares[10]} color={trialResults[10]}/>
                <Grid value={squares[11]} color={trialResults[11]}/>
                <Grid value={squares[12]} color={trialResults[12]}/>
                <Grid value={squares[13]} color={trialResults[13]}/>
                <Grid value={squares[14]} color={trialResults[14]}/>
            </div>
            <div className={"board-row"}>
                <Grid value={squares[15]} color={trialResults[15]}/>
                <Grid value={squares[16]} color={trialResults[16]}/>
                <Grid value={squares[17]} color={trialResults[17]}/>
                <Grid value={squares[18]} color={trialResults[18]}/>
                <Grid value={squares[19]} color={trialResults[19]}/>
            </div>
            <div className={"board-row"}>
                <Grid value={squares[20]} color={trialResults[20]}/>
                <Grid value={squares[21]} color={trialResults[21]}/>
                <Grid value={squares[22]} color={trialResults[22]}/>
                <Grid value={squares[23]} color={trialResults[23]}/>
                <Grid value={squares[24]} color={trialResults[24]}/>
            </div>
            <div className={"board-row"}>
                <Grid value={squares[25]} color={trialResults[25]}/>
                <Grid value={squares[26]} color={trialResults[26]}/>
                <Grid value={squares[27]} color={trialResults[27]}/>
                <Grid value={squares[28]} color={trialResults[28]}/>
                <Grid value={squares[29]} color={trialResults[29]}/>
            </div>
        </>

    );
}

function KeyBoard({onPlay, handleCancel, handleEnter, colors}) {
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
                <Key letter={'Q'} onKeyClick={() => handleKeyClick('Q')} color={colors['Q']}/>
                <Key letter={'W'} onKeyClick={() => handleKeyClick('W')} color={colors['W']}/>
                <Key letter={'E'} onKeyClick={() => handleKeyClick('E')} color={colors['E']}/>
                <Key letter={'R'} onKeyClick={() => handleKeyClick('R')} color={colors['R']}/>
                <Key letter={'T'} onKeyClick={() => handleKeyClick('T')} color={colors['T']}/>
                <Key letter={'Y'} onKeyClick={() => handleKeyClick('Y')} color={colors['Y']}/>
                <Key letter={'U'} onKeyClick={() => handleKeyClick('U')} color={colors['U']}/>
                <Key letter={'I'} onKeyClick={() => handleKeyClick('I')} color={colors['I']}/>
                <Key letter={'O'} onKeyClick={() => handleKeyClick('O')} color={colors['O']}/>
                <Key letter={'P'} onKeyClick={() => handleKeyClick('P')} color={colors['P']}/>
            </div>
            <div className={"key-row"}>
                <Key letter={'A'} onKeyClick={() => handleKeyClick('A')} color={colors['A']}/>
                <Key letter={'S'} onKeyClick={() => handleKeyClick('S')} color={colors['S']}/>
                <Key letter={'D'} onKeyClick={() => handleKeyClick('D')} color={colors['D']}/>
                <Key letter={'F'} onKeyClick={() => handleKeyClick('F')} color={colors['F']}/>
                <Key letter={'G'} onKeyClick={() => handleKeyClick('G')} color={colors['G']}/>
                <Key letter={'H'} onKeyClick={() => handleKeyClick('H')} color={colors['H']}/>
                <Key letter={'J'} onKeyClick={() => handleKeyClick('J')} color={colors['J']}/>
                <Key letter={'K'} onKeyClick={() => handleKeyClick('K')} color={colors['K']}/>
                <Key letter={'L'} onKeyClick={() => handleKeyClick('L')} color={colors['L']}/>
            </div>
            <div className={"key-row"}>
                <EnterKey onEnterClick={() => handleEnterClick()}/>
                <Key letter={'Z'} onKeyClick={() => handleKeyClick('Z')} color={colors['Z']}/>
                <Key letter={'X'} onKeyClick={() => handleKeyClick('X')} color={colors['X']}/>
                <Key letter={'C'} onKeyClick={() => handleKeyClick('C')} color={colors['C']}/>
                <Key letter={'V'} onKeyClick={() => handleKeyClick('V')} color={colors['V']}/>
                <Key letter={'B'} onKeyClick={() => handleKeyClick('B')} color={colors['B']}/>
                <Key letter={'N'} onKeyClick={() => handleKeyClick('N')} color={colors['N']}/>
                <Key letter={'M'} onKeyClick={() => handleKeyClick('M')} color={colors['M']}/>
                <Key letter={'?'} onKeyClick={() => handleKeyClick('?')} color={colors['?']}/>
                <CancelKey onCancelClick={() => handleCancelClick()}/>
            </div>
        </>
    );
}


function Game() {
    const wordList = hardWords;
    console.log(wordList);
    const [secretCode, setSecretCode] = useState('');
    useEffect(() => {
        setSecretCode(getSecretCode(simpleWords).toUpperCase());
    }, []);
    const [history, setHistory] = useState(Array(30).fill(null));
    const [trial, setTrial] = useState(0);
    const currentTrial = history.slice(trial, trial + 5);
    const nonNullElementsCount = currentTrial.filter(element => element !== null).length;
    const isReady = nonNullElementsCount === 5 ? true : false; // If the current trial has non-null value, return false
    const [trialResults, setTrialResults] = useState(Array(30).fill(null));
    const initialColorState = {
        'Q': null,
        'W': null,
        'E': null,
        'R': null,
        'T': null,
        'Y': null,
        'U': null,
        'I': null,
        'O': null,
        'P': null,
        'A': null,
        'S': null,
        'D': null,
        'F': null,
        'G': null,
        'H': null,
        'J': null,
        'K': null,
        'L': null,
        'Z': null,
        'X': null,
        'C': null,
        'V': null,
        'B': null,
        'N': null,
        'M': null
    }
    const [colors, setColors] = useState(initialColorState);
    // Function to reset the game
    const resetGame = () => {
        setHistory(Array(30).fill(null));
        setTrialResults(Array(30).fill(null));
        setColors(initialColorState);
        setTrial(0);
        setSecretCode(getSecretCode(simpleWords).toUpperCase());
    }

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
        }
    }

    function handleEnter() {
        const currentAnswer = currentTrial.join('')
        if (isReady) {
            if (currentAnswer === secretCode) {
                // If the player win the game
                console.log("You Win!");
            }

            if (trial === 25) {
                // If the player lose the game (they have tried all chances)
                console.log("You lose!")
                console.log("The answer is " + secretCode);
            }
            if (wordList.includes(currentAnswer.toLowerCase())) {
                // Return the result of this trial
                const trialResult = getTrialResult(secretCode, currentAnswer);
                console.log(trialResult);
                // Update the result of this trial to the trialResults list
                const newTrialResults = [...trialResults];
                newTrialResults.splice(trial, 5, ...trialResult);
                setTrialResults(newTrialResults);
                console.log(trialResults);
                // Set the colors of the keyboard
                const newColors = {...colors};
                for (let i = 0; i < currentAnswer.length; i++) {
                    newColors[currentAnswer[i]] = trialResult[i];
                }
                setColors(newColors);
                console.log(colors);
                // Move to the next trial
                setTrial(trial + 5);
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

    const handleKeyPress = (event) => {
        if (/[a-zA-Z]/.test(event.key) && event.key.length === 1) {
            handleKey(event.key.toUpperCase());
        } else if (event.key === 'Enter') {
            handleEnter();
        } else if (event.key === 'Backspace') {
            handleCancel();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKey, handleEnter, handleCancel]);


    return (
        <>
            <Header/>

            <div className={"game"}>
                <div className={"game-board"}>
                    <Board squares={history} trialResults={trialResults}/>
                    <button className={"refresh"} onClick={resetGame}><FontAwesomeIcon icon={faSyncAlt}/></button>
                </div>
                <div className={"game-keyboard"}>
                    <KeyBoard onPlay={handleKey} handleCancel={handleCancel} handleEnter={handleEnter} colors={colors}/>
                </div>
            </div>
        </>
    );
}

export default Game;

function getSecretCode(words) {
    const randomIndex = Math.floor(Math.random() * words.length);
    const secretCode = words[randomIndex];
    return secretCode;
}

function getTrialResult(secretCode, currentAnswer) {
    // Get the result of each trial,
    // grey represent the choice is not included in the secret code
    // green represent the choice is in the correct position of the secret code
    // yellow represent the choice is in the secret code but not in the correct position
    // console.log(secretCode);
    // console.log(currentAnswer);
    let trialResult = Array(currentAnswer.length).fill(null);
    for (let i = 0; i < currentAnswer.length; i++) {
        if (!secretCode.includes(currentAnswer[i])) {
            trialResult[i] = "grey";
        } else if (secretCode[i] === currentAnswer[i]) {
            trialResult[i] = "green";
        } else {
            trialResult[i] = "yellow";
        }
    }
    return trialResult;
}