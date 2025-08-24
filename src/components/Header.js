import wordleLogo from "../wordle-icon.png";
import { styles } from '../GlobalStyles';

export const Header = () => {
    return (
        <header className="header" style={styles.header}>
            <img src={wordleLogo} alt={"Wordle Logo"} className={"logo"} />
            <div>Wordle Game</div>
            <nav className="navigation">
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
            </nav>
        </header>
    );
};