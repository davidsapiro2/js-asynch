"use strict"

let deck_id = "";

async function getDeck() {
  const resp = await fetch(
    'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');

  const deck = await resp.json()
  deck_id = deck.deck_id;
}

async function drawCard() {
  const resp = await fetch(
    `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);

  const cardData = await resp.json();
  const image_url = cardData.cards[0].image;
  $("#cardHome").append(`<img src="${image_url}"/>`);
}

$("button").on("click", drawCard);

getDeck();