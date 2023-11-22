<template>
  <div class="app">

    <button class="btn btn-primary" v-if="gameState == 0" @click="startGame()">Start Game</button>
    <button class="btn btn-primary" v-if="gameState != 0" @click="resetGame()">Reset Game</button>

    <div style="display: flex;justify-content: center;">
      <ColorCard 
      class="card"
      :color="deckTop.color"
      :number="deckTop.number"
      />
    </div>

    <br><p><b>Your deck</b> <br> <button class="btn btn-primary" @click="playerDrawCard()">Draw new card</button></p>
    <div class="deck" >
      <ColorCard 
        class="card" 
        v-for="(card, index) in playerCards" 
        :key="index" 
        :color="card.color" 
        :number="card.number" 
        @click="chooseCard(card)"/>
    </div>
  </div>
</template>

<script>
import { utils } from './lib/utils';
import { aiOptions } from './lib/ai';
import ColorCard from './components/ColorCard.vue';
import { ref } from 'vue';

export default {
  components: {
    ColorCard
  },
  setup() {
    const playerCards = ref([]);
    const cpuCards = ref([]);
    const deckTop = ref({}); // Top card of the deck
    const playerTurn = ref(true); // Player turn or CPU turn
    const gameState = ref(0); // Game state

    // Crete Random Card Eveytime
    const drawRandomCard = () => {
      return {
        color: utils.cardColors[Math.floor(Math.random() * utils.cardColors.length)],
        number: utils.cardNumbers[Math.floor(Math.random() * utils.cardNumbers.length)]
      }
    }

    // Initialize the game
    const initializeGame = () => {
      let tempCards = [];
      for (let i = 0; i <= 20; i++) {
        tempCards.push(drawRandomCard());
      }
      playerCards.value = tempCards;
    }

    const initializeGameCPU = () => {
      let tempCards = [];
      for (let i = 0; i <= 20; i++) {
        tempCards.push(drawRandomCard());
      }
      cpuCards.value = tempCards;
    }

    // Player Draw a card
    const playerDrawCard = () => {
      if(playerCards.value.length == 0) return;
      playerCards.value.push(drawRandomCard());
      playerTurn.value = false;
      setTimeout(() => {
        cpuPlay();
      }, 1000);
    }

    // Player to select the card
    const chooseCard = (card) => {
      // check valid card
      if(!utils.nextCardIsValid(card, deckTop.value)) {
        console.log('Invalid Card')
        return;
      }
      deckTop.value = card;

      // Remove card from player deck
      playerCards.value = playerCards.value.filter((item) => {
        return item.color !== card.color || item.number !== card.number;
      })

      // Winner
      if (playerCards.value.length === 0 && cpuCards.value.length > 0) {
        alert('You Win');
        gameState.value = 2;
        return;
      }

      playerTurn.value = false;

      setTimeout(() => {
        cpuPlay();
      }, 1000);

    }

    const cpuPlay = () => {
      let card = aiOptions.getNextCard(cpuCards.value, deckTop.value);
      // console.log(card);
      // If no card found, draw a card
      if(!card) {
        if ( card === false ) {
          alert('CPU Win');
          return;
        }
        cpuCards.push(drawRandomCard());
        alert('CPU draw a card');
        playerTurn.value = true;
        return;
      } 
      deckTop.value = card;

      // Remove card from CPU deck
      cpuCards.value = cpuCards.value.filter((item) => {
        return item.color !== card.color || item.number !== card.number;
      })

      // Winner
      if (cpuCards.value.length === 0 && playerCards.value.length > 0) {
        alert('CPU Win');
        gameState.value = 2;
        return;
      }

      playerTurn.value = true;
    }

    // Button click of the Start Game
    const startGame = () => {
      initializeGame();
      initializeGameCPU();
      gameState.value = 1;
    }

    const resetGame = () => {
      playerCards.value = [];
      cpuCards.value = [];
      deckTop.value = {};
      playerTurn.value = true;
      gameState.value = 0;
    }

    return {
      startGame,
      playerCards,
      chooseCard,
      deckTop,
      playerDrawCard,
      resetGame,
      gameState
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.deck {
  display: flex;
  min-height: 100px;
  max-height: 400px;
  overflow-x: auto;
  overflow-y: scroll;
  border: 1px solid;
  flex-wrap: wrap;
}

.card {
  width: 100px;
  height: 150px;
  margin: 0.5rem;
  cursor: pointer;
}

.align-center {
  text-align: center;
}
</style>
