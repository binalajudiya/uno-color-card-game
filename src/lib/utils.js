export const utils = {
  cardColors: ['Red', 'Green', 'Blue', 'Pink', 'Yellow'],
  cardNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],

  nextCardIsValid: function (card, deckTop) {
    if(!deckTop.color) { 
      // console.log('No deckTop value');
      return true;
    }
    
    if(!card.color) {
      // console.log('No card value');
      return false;
    }

    if(card.color === deckTop.color) {
      // console.log('Same color');
      return true;
    }
    else if(card.number === deckTop.number) {
      // console.log('Same number');
      return true;
    }
    else {
      // console.log('Not same color or number');
      return false;
    }

  },
}