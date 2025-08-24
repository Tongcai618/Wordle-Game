import '../App.css';
import hardWords from '../words.json';
import { useEffect, useState, useCallback  } from "react";
import { FaBackspace } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { Header } from '../components/Header';


function Grid({ value, color }) {
    // Get the class name of the grid
    let gridClass = `grid ${color}`;

    return (
        <div className={gridClass}>{value}</div>
    );
}


function Key({ letter, onKeyClick, color }) {
    let keyClass = `key ${color}`
    return (
        <button className={keyClass} onClick={onKeyClick}>{letter}</button>
    )
}

function EnterKey({ onEnterClick }) {
    return (
        <button className={"key enter-key"} onClick={onEnterClick}>✓</button>
    )
}

function CancelKey({ onCancelClick }) {
    return (
        <button className={"key cancel-key"} onClick={onCancelClick}><FaBackspace /></button>
    )
}


function Board({ squares, trialResults }) {
    const numberOfRows = 6;
    const gridsPerRow = 5;

    let rows = [];

    for (let i = 0; i < numberOfRows; i++) {
        let row = [];
        for (let j = 0; j < gridsPerRow; j++) {
            const index = i * gridsPerRow + j;
            row.push(
                <Grid
                    key={index}
                    value={squares[index]}
                    color={trialResults[index]}
                />
            );

        }
        rows.push(<div key={i} className={"board-row"}>{row}</div>)
    }

    return (
        <>{rows}</>
    );
}

function KeyBoard({ onPlay, handleCancel, handleEnter, colors }) {
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
                <Key letter={'Q'} onKeyClick={() => handleKeyClick('Q')} color={colors['Q']} />
                <Key letter={'W'} onKeyClick={() => handleKeyClick('W')} color={colors['W']} />
                <Key letter={'E'} onKeyClick={() => handleKeyClick('E')} color={colors['E']} />
                <Key letter={'R'} onKeyClick={() => handleKeyClick('R')} color={colors['R']} />
                <Key letter={'T'} onKeyClick={() => handleKeyClick('T')} color={colors['T']} />
                <Key letter={'Y'} onKeyClick={() => handleKeyClick('Y')} color={colors['Y']} />
                <Key letter={'U'} onKeyClick={() => handleKeyClick('U')} color={colors['U']} />
                <Key letter={'I'} onKeyClick={() => handleKeyClick('I')} color={colors['I']} />
                <Key letter={'O'} onKeyClick={() => handleKeyClick('O')} color={colors['O']} />
                <Key letter={'P'} onKeyClick={() => handleKeyClick('P')} color={colors['P']} />
            </div>
            <div className={"key-row"}>
                <Key letter={'A'} onKeyClick={() => handleKeyClick('A')} color={colors['A']} />
                <Key letter={'S'} onKeyClick={() => handleKeyClick('S')} color={colors['S']} />
                <Key letter={'D'} onKeyClick={() => handleKeyClick('D')} color={colors['D']} />
                <Key letter={'F'} onKeyClick={() => handleKeyClick('F')} color={colors['F']} />
                <Key letter={'G'} onKeyClick={() => handleKeyClick('G')} color={colors['G']} />
                <Key letter={'H'} onKeyClick={() => handleKeyClick('H')} color={colors['H']} />
                <Key letter={'J'} onKeyClick={() => handleKeyClick('J')} color={colors['J']} />
                <Key letter={'K'} onKeyClick={() => handleKeyClick('K')} color={colors['K']} />
                <Key letter={'L'} onKeyClick={() => handleKeyClick('L')} color={colors['L']} />
            </div>
            <div className={"key-row"}>
                <EnterKey onEnterClick={() => handleEnterClick()} />
                <Key letter={'Z'} onKeyClick={() => handleKeyClick('Z')} color={colors['Z']} />
                <Key letter={'X'} onKeyClick={() => handleKeyClick('X')} color={colors['X']} />
                <Key letter={'C'} onKeyClick={() => handleKeyClick('C')} color={colors['C']} />
                <Key letter={'V'} onKeyClick={() => handleKeyClick('V')} color={colors['V']} />
                <Key letter={'B'} onKeyClick={() => handleKeyClick('B')} color={colors['B']} />
                <Key letter={'N'} onKeyClick={() => handleKeyClick('N')} color={colors['N']} />
                <Key letter={'M'} onKeyClick={() => handleKeyClick('M')} color={colors['M']} />
                <Key letter={'?'} onKeyClick={() => handleKeyClick('?')} color={colors['?']} />
                <CancelKey onCancelClick={() => handleCancelClick()} />
            </div>
        </>
    );
}


export function Game() {
    const wordList = hardWords;
    const [secretCode, setSecretCode] = useState('');
    useEffect(() => {
        setSecretCode(getSecretCode(hardWords).toUpperCase());
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
        setSecretCode(getSecretCode(hardWords).toUpperCase());
    }

    const handleKey = useCallback((letter) => {
        if (!isReady) {
            const newCurrentTrial = [...currentTrial];
            const nullIndex = currentTrial.findIndex((item) => item === null);
            if (nullIndex !== -1) {
                newCurrentTrial[nullIndex] = letter;
                const newHistory = [...history];
                newHistory.splice(trial, 5, ...newCurrentTrial);
                setHistory(newHistory);
            }
        }
    }, [isReady, currentTrial, history, trial]);


    const handleEnter = useCallback(() => {
        const currentAnswer = currentTrial.join('');
        if (isReady) {
            if (currentAnswer === secretCode) {
                console.log("You Win!");
            }

            if (trial === 25) {
                console.log("You lose!");
                console.log("The answer is " + secretCode);
            }

            if (wordList.includes(currentAnswer.toLowerCase())) {
                const trialResult = getTrialResult(secretCode, currentAnswer);
                const newTrialResults = [...trialResults];
                newTrialResults.splice(trial, 5, ...trialResult);
                setTrialResults(newTrialResults);

                const newColors = { ...colors };
                for (let i = 0; i < currentAnswer.length; i++) {
                    newColors[currentAnswer[i]] = trialResult[i];
                }
                setColors(newColors);
                setTrial(trial + 5);
            }
        }
    }, [isReady, currentTrial, secretCode, trial, wordList, trialResults, colors]);


    const handleCancel = useCallback(() => {
        const newCurrentTrial = [...currentTrial];
        const newHistory = [...history];

        if (isReady) {
            newCurrentTrial[newCurrentTrial.length - 1] = null;
        } else {
            const nullIndex = newCurrentTrial.findIndex((item) => item === null);
            if (nullIndex > 0) {
                newCurrentTrial[nullIndex - 1] = null;
            }
        }
        newHistory.splice(trial, 5, ...newCurrentTrial);
        setHistory(newHistory);
    }, [isReady, currentTrial, history, trial]);


    // inside your Game component
    const handleKeyPress = useCallback((event) => {
        if (/[a-zA-Z]/.test(event.key) && event.key.length === 1) {
            handleKey(event.key.toUpperCase());
        } else if (event.key === 'Enter') {
            handleEnter();
        } else if (event.key === 'Backspace') {
            handleCancel();
        }
    }, [handleKey, handleEnter, handleCancel]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]); // ✅ Now properly included


    return (
        <>
            <Header />

            <div className={"game"}>
                <div className={"game-board"}>
                    <Board squares={history} trialResults={trialResults} />
                    <button className={"refresh"} onClick={resetGame}><FontAwesomeIcon icon={faSyncAlt} /></button>
                </div>
                <div className={"game-keyboard"}>
                    <KeyBoard onPlay={handleKey} handleCancel={handleCancel} handleEnter={handleEnter} colors={colors} />
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

