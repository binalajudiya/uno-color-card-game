<template>
  <div class="app">

    <!-- <div class="deck">
      <ColorCard class="card" v-for="(card, index) in cpuCards" :key="index" :color="card.color" :number="card.number"
        :special="card.special" @click="chooseCard(card)" />
    </div> -->

    <button class="btn btn-primary" v-if="gameState == 0" @click="startGame()">Start Game</button>
    <button class="btn btn-primary" v-if="gameState != 0" @click="resetGame()">Reset Game</button>

    <div style="display: flex;justify-content: center;">
      <ColorCard class="card" :color="deckTop.color" :number="deckTop.number" :special="deckTop.special" />
    </div>

    <br>
    <p><b>Your deck</b> <br> <button class="btn btn-primary" @click="playerDrawCard()">Draw new card</button></p>
    <div class="deck">
      <ColorCard class="card" v-for="(card, index) in playerCards" :key="index" :color="card.color" :number="card.number"
        :special="card.special" @click="chooseCard(card)" />
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
      /* const specialCards = [null, "&#10228", "&#8634", "+2", "Wild", "+4"];
      const isSpecial = Math.random() < 0.2; // 20% chance to draw a special card
      const specialColor = "linear-gradient(135deg, hsla(56, 100%, 48%, 1) 0%, hsla(0, 100%, 50%, 1) 33%, hsla(213, 100%, 50%, 1) 67%, hsla(117, 100%, 50%, 1) 100%)"; */

      return {
        color: utils.cardColors[Math.floor(Math.random() * utils.cardColors.length)],
        number: utils.cardNumbers[Math.floor(Math.random() * utils.cardNumbers.length)]
      };
    }

    // Initialize the game
    const initializeGame = () => {
      let tempCards = [];
      for (let i = 0; i <= 20; i++) {
        tempCards.push(drawRandomCard());
        // console.log(drawRandomCard())
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
      if (playerCards.value.length == 0) return;
      playerCards.value.push(drawRandomCard());
      playerTurn.value = false;
      setTimeout(() => {
        cpuPlay();
      }, 1000);
    }

    /* const playCard = (card) => {
      // console.log(card.special)
      if (card.special) {
        switch (card.special) {
          case "&#10228":
            playerTurn.value = false;
            break;
          case "&#8634":
            playerTurn.value = !playerTurn.value;
            break;
          case "+2":
            playerDrawCard();
            playerDrawCard();
            break;
          case "Wild":
            break;
          case "+4":
            playerDrawCard();
            playerDrawCard();
            break;
          case null:
            break;
        }
      }
    } */

    // Player to select the card
    const chooseCard = (card) => {

      // check valid card
      if (!utils.nextCardIsValid(card, deckTop.value)) {
        console.log('Invalid Card')
        return;
      }

      // Remove card from player deck
      playerCards.value = playerCards.value.filter((item) => {
        return item.color !== card.color || item.number !== card.number;
      })

      // Winner
      if (playerCards.value.length === 0 && cpuCards.value.length > 0) {
        alert('You Win');
        resetGame();
        return;
      }

      playerTurn.value = false;
      deckTop.value = card;
      // console.log(deckTop.value)

      setTimeout(() => {
        cpuPlay();
      }, 1000);

    }

    const cpuPlay = () => {
      let card = aiOptions.getNextCard(cpuCards.value, deckTop.value);

      // If no card found, draw a card
      if (!card) {
        /* if (card === false) {
          alert('CPU Win');
          console.log('CPU Win');
          resetGame();
          return;
        } */
        cpuCards.value.push(drawRandomCard());
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
        console.log('CPU Win');
        resetGame();
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
      console.log("Reset Game");
      playerCards.value = [];
      cpuCards.value = [];
      deckTop.value = {};
      playerTurn.value = true;
      gameState.value = 0;
    }

    return {
      startGame,
      playerCards,
      cpuCards,
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.align-center {
  text-align: center;
}
</style>
