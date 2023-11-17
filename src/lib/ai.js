export const aiOptions = {
  getNextCard(cards, deckTop) {
    const filteredCards = cards.find(card => card.color === deckTop.color || card.number === deckTop.number);
    if(!filteredCards) { return false; }
    console.log(filteredCards)
    return filteredCards;
  }
}