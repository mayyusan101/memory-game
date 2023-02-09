import React, { useEffect, useState } from "react";
import SingleCard from "./SingleCard";
import "./Card.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const cards = [
  { src: "./img/helmet-1.png", matched: false },
  { src: "./img/potion-1.png", matched: false },
  { src: "./img/ring-1.png", matched: false },
  { src: "./img/scroll-1.png", matched: false },
  { src: "./img/shield-1.png", matched: false },
  { src: "./img/sword-1.png", matched: false },
];

function Cards() {
  const [card, setCard] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [turn, setTurn] = useState(0);
  const [disabledClick, setDisabledClick] = useState(false);
  const [checkWin, setCheckWin] = useState(0);

  // shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...cards, ...cards].sort((_) => Math.random() - 0.5).map((card) => ({ ...card, id: Math.random(), matched: false }));
    setCard(shuffleCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn(0);
    setTimeout(() => {
      // flip cards for .5s at the starting game
      setCard(shuffleCards.map((card) => ({ ...card, matched: true })));
    }, 500);
    setTimeout(() => {
      // flip cards for .5s at the starting game
      setCard(shuffleCards.map((card) => ({ ...card, matched: false })));
    }, 1500);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabledClick(true); // prevent clicking before transition is done
      if (choiceOne.src === choiceTwo.src) {
        setCard((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
        setCheckWin((prev) => prev + 1);
      } else {
        setTimeout(() => resetTurn(), 500); // for 1s show
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    const isEmptyCard = card.filter((card) => card.matched === false);
    // no all false == all ture and not show at the beginning of game
    if (isEmptyCard.length === 0 && checkWin) {
      sweetAlert();
    }
  }, [checkWin]);

  // handle click
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // reset turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn((prev) => prev + 1);
    setDisabledClick(false);
  };
  // automatically start game when page load
  useEffect(() => {
    shuffleCards();
  }, []);

  // sweet alert for winning
  const sweetAlert = () => {
    MySwal.fire({
      title: <p>Congratulation, you win the game</p>,
      icon: "success",
      confirmButtonText: "Play again!",
    }).then(() => {
      return shuffleCards();
    });
  };
  return (
    <>
      <div className="card__heading">
        <h2>Magic Match</h2>
        <button onClick={shuffleCards}>New Game</button>
      </div>
      <div className="card__wrapper">
        {card.map((card) => (
          <SingleCard card={card} key={card.id} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched} disabledClick={disabledClick} />
        ))}
      </div>
      <p className="turn">
        Your turn - <span>{turn}</span>
      </p>
    </>
  );
}

export default Cards;
