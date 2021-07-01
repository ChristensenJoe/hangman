const wordArray = ["Hello", "Goodbye", "Baby", "Steve", "Lucky"];
const correctWord = randomWord(wordArray);
const guessedLetters = [];

document.addEventListener("DOMContentLoaded", () => {
    let wordTable = document.querySelector("#wordTable");
    correctWord.forEach((letter) => {
        let letterSpace = document.createElement("th");
        letterSpace.id = letter + "Space";
        letterSpace.style.fontFamily = "Georgia, 'Times New Roman', Times, serif";
        letterSpace.textContent = "_";
        wordTable.appendChild(letterSpace);
        console.log(letter);
    });
});

/**
 * 
 * @param arr an Array of Strings
 * @returns an array of characters created from one of the argument's elements
 */
function randomWord(arr) {
    return arr[Math.floor(Math.random() * wordArray.length)].toUpperCase().split("");
}