<template>
  <h1>Elsie Type</h1>

  <p>
    A typing game named after my grandma, Elsie. She worked as a Stenographer in
    the 1940s. I'm pretty much going for a MonkeyType.com clone with my own
    personal spins on it.
  </p>

  <p>Start typing the word(s) below to begin</p>
  <Game />

  <p>Latest score</p>
  <p>{{ scores.slice(-1)[0] || 0 }}</p>

  <p>Current score</p>
  <p>{{ currentScore }}</p>
  <input type="number" v-model="currentScore" />
  <button @click="scoreStore.updateLatestScore(currentScore)">
    Submit score
  </button>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useScoreStore } from "#build/imports";

const currentScore = ref(0);

const scoreStore = useScoreStore();
const { scores } = storeToRefs(scoreStore);
</script>
