const wordArray = ["Hello", "Goodbye", "Baby", "Steve", "Lucky"];
const correctWord = randomWord(wordArray);
const guessedLetters = [];
const letterArray = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

document.addEventListener("DOMContentLoaded", () => {
    let wordTable = document.querySelector("#wordTable");
    correctWord.forEach((letter) => {
        let letterSpace = document.createElement("th");
        letterSpace.className = "wordClass";
        letterSpace.id = letter + "Space";
        letterSpace.style.fontFamily = "Georgia, 'Times New Roman', Times, serif";
        letterSpace.textContent = "_";
        wordTable.appendChild(letterSpace);
        console.log(letter);
    });

    letterArray.forEach((letter) => {
        let letterCell = document.querySelector("#" +letter);
        letterCell.addEventListener("click", () => {
            if(correctWord.includes(letter)) {
            }
        });
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