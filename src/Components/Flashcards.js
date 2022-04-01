import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import data from "../data/db.json";

import FlashCard from "./FlashCard";
import EmbedModal from "./EmbedModal";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import "./Flashcards.css";

const Flashcards = () => {
  const { id } = useParams();
  const [studySet, setStudySet] = useState({});
  const [cards, setCards] = useState([]);
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const apiURL = "https://flipcardzdb.herokuapp.com";

  useEffect(() => {
    async function fetchData() {
      try {
        let res, data, cardSets;
        res = await axios.get(`${apiURL}/card/all-flashcards`);
        if (res.status === 200 && data !== null) {
          data = res.data;
          cardSets = data.map((cv) => ({
            card_id: cv.card_id,
            set_id: cv.set_id,
            course: cv.set_name,
            title: cv.set_name,
            cards: data.filter((card) => card.set_name === cv.set_name) || [],
          }));

          let foundStudySet = cardSets.find((set) => set.set_id === Number(id));
          setStudySet(foundStudySet);

          // Get the flashcards from the study set and set the first card visibility to isVisible
          let flashCards = foundStudySet.cards.map((card, index) =>
            index === currentCardIdx
              ? ((card.isVisible = true), card)
              : ((card.isVisible = false), card)
          );
          setCards(flashCards);
        }
      } catch (e) {
        console.log("fetch cards error", e);
      }
    }
    return fetchData();
  }, [id]);
  console.log("cards", cards);

  //   useEffect(() => {
  //     // Get the current study set based on the id from the url parameters
  //   }, [cards]);

  const changeCard = (direction) => {
    // Set the current card isVisible to false
    cards[currentCardIdx].isVisible = false;

    // If previous card - find the previous card by subtracting one from the index
    // If next card - find the next card by adding one to the index
    let newIdx;
    direction === "previous"
      ? (newIdx = currentCardIdx - 1)
      : (newIdx = currentCardIdx + 1);

    // Set the new current card isVisible to true
    cards[newIdx].isVisible = true;
    //Set the new current card index
    setCurrentCardIdx(newIdx);
  };

  console.log("cards", cards);
  return (
    <Container className="flashcards">
      {cards &&
        cards.map((card) => <FlashCard key={card.card_id} card={card} />)}
      <div className="navContainer">
        <nav className="flashcardsNavigation">
          <Button
            onClick={() => changeCard("previous")}
            disabled={currentCardIdx === 0}
          >
            <i class="bi bi-arrow-left-circle-fill"></i>
          </Button>
          <p className="counter">
            {currentCardIdx + 1} / {cards.length}
          </p>
          <Button
            onClick={() => changeCard("next")}
            disabled={currentCardIdx === cards.length - 1}
          >
            <i class="bi bi-arrow-right-circle-fill"></i>
          </Button>
        </nav>
        <EmbedModal studySetId={id} />
      </div>
    </Container>
  );
};

export default Flashcards;
