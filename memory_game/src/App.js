import { useState, useEffect } from "react";
import { cardImages } from "./Components/Images";
import Header from "./Components/Header";
import Grid from "./Components/Grid";
import './App.css';
const App = () => {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [winner, setWinner] = useState(null);
    const [exceeds, setExceeds] = useState(null);
    //  Shuffle the cards
    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }));
        setCards(shuffledCards);
        setTurns(0);
        setExceeds(false);
        setWinner(false);
        setDisabled(false);
    };
    // Call the shuffle card function at first render
    useEffect(() => {
        shuffleCards();
    }, []);
    //  Handle Choice (Adding the clicked cards in the two slot states defined)
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    };
    //  Check if the two cards clicked are matching
    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.src === choiceTwo.src) {
                setCards((prevCards) => {
                    return prevCards.map((card) => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true };
                        } else {
                            return card;
                        }
                    });
                });
                backToDefault();
            } else {
                setTimeout(() => backToDefault(), 500);
            }
        }
    }, [choiceOne, choiceTwo]);
    //  Reset on every turn
    const backToDefault = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setDisabled(false);
        setTurns((prevTurns) => prevTurns + 1);
    }
    useEffect(() => {
        setTimeout(() => {
            const isTrue = cards.every((card) => card.matched === true);
            if (turns >= 15) {
                setExceeds(true)
                // Disbaled user from clicking on cards
                setDisabled(true);
            }
            else if (isTrue && cards.length > 0) {
                setWinner(true)
            }
        }, 500);
    }, [turns, cards, winner]);
    return (
        <div className="App">
            <Header turns={turns} onShuffle={shuffleCards} />
            {
                winner ? <div className='result'>Congratulations, You Win!!</div> : <div></div>
            }
            {
                exceeds ? <div className='result'>Uh Oh, You've Exhausted the Turns Counter!!</div> : <div></div>
            }
            <Grid cards={cards} choiceOne={choiceOne} choiceTwo={choiceTwo} disabled={disabled} handleChoice={handleChoice} />
        </div>
    )
}
export default App;