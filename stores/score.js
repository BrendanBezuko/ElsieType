import { defineStore } from "pinia";

export const useScoreStore = defineStore("score", {
  state: () => {
    return {
      scores: [],
    };
  },
  actions: {
    updateLatestScore(score) {
      this.scores.push(score);
    },
  },
  getters: {
    getLatestScore(score) {
      this.scores.slice(-1)[0];
    },
  },
});
