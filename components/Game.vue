<template>
  <div class="quiz__game-area" v-capture-key="keyStroke">
    <div class="game-area__word">
      <div
        :class="{
          'typed-letter': isCorrect(index),
          'incorrect-letter': isIncorrect(index),
        }"
        class="word__letter"
        v-for="(letter, index) in displayLetters"
        :key="index"
      >
        {{ letter !== " " ? letter : "&nbsp;" }}
      </div>
    </div>
  </div>
</template>

<script setup>
const words = ref([
  "awkward  ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", // Alternating hands, distant letters
  "bookkeeper", // Repeated letters
  "phenomenon", // Alternating hands
  "thumbscrew", // Rare letters
  "quizzically", // Contains z and q
  "sphinx", // Consonant-heavy
  "subdermatoglyphic", // Long word, unique letters
  "rhythms", // No vowels, awkward consonant sequence
  "unconstitutional", // Long and complex
  "transcendental",
  "people",
]);
const typedWord = ref({
  word: words.value[0],
  typed: "",
  correctIndex: 0,
  mistakes: 0,
});
const wordIndex = ref(0);
const score = ref(0);
const mistakes = ref(0);

const displayLetters = computed(() => {
  //letters typed + mistakes (if any) +
  let correct = typedWord.value.word
    .split("")
    .slice(0, typedWord.value.correctIndex);
  let incorrect = typedWord.value.typed
    .split("")
    .slice(
      typedWord.value.correctIndex,
      typedWord.value.mistakes + typedWord.value.correctIndex
    );
  let end = typedWord.value.word
    .split("")
    .splice(
      typedWord.value.correctIndex,
      typedWord.value.word.length + typedWord.value.mistakes
    );
  return [...correct, ...incorrect, ...end].join("");
});

function isCorrect(index) {
  return index < typedWord.value.correctIndex;
}

function isIncorrect(index) {
  return (
    index >= typedWord.value.correctIndex &&
    index < typedWord.value.correctIndex + typedWord.value.mistakes
  );
}

//intialize typedWord to the first word on start up

function keyStroke(event) {
  let key = event.key;
  if (
    key === typedWord.value.word.split("")[typedWord.value.correctIndex] &&
    typedWord.value.mistakes == 0
  ) {
    //correct letter
    typedWord.value.correctIndex++;
    typedWord.value.typed = typedWord.value.typed + key;
    //console.log("correct letter");
    if (typedWord.value.correctIndex == typedWord.value.word.length) {
      // word finished
      score.value++;
      wordIndex.value++;
      if (wordIndex.value == words.value.length) {
        // game finsihed
        console.log("finished game");
        wordIndex.value = 0;
      }
      typedWord.value = {
        word: words.value[wordIndex.value],
        typed: "",
        correctIndex: 0,
        mistakes: 0,
      };
      console.log("new word");
    }
  } else if (key === "Backspace") {
    //delete letter
    if (typedWord.value.mistakes > 0) {
      typedWord.value.mistakes--;
      typedWord.value.typed = typedWord.value.typed.slice(0, -1);
    }
  } else {
    //incorrect letter
    typedWord.value.mistakes++;
    mistakes.value++;
    typedWord.value.typed = typedWord.value.typed + key;
  }
}
</script>

<style lang="css" scoped>
.quiz__game-area {
  height: 60vh;
  width: 80vw;
  max-width: 800px;
  margin: auto;
}

.game-area__word {
  height: fit-content;
  width: fit-content;
  text-align: center;
  margin: auto;
}

.word__letter {
  display: inline-block;
  color: black;
  font-size: x-large;
}

.typed-letter {
  color: yellowgreen;
}

.incorrect-letter {
  color: red;
}
</style>
