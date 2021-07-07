let correctWord = [];
let wordArray = [];
let guessedLetters = [];
const letterArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const green = "#81B622";
const grey = "#909090";
let hangmanNumber = 1;
const difficulty = {
    easy: 1,
    medium: 2,
    hard: 3
};

document.addEventListener("DOMContentLoaded", () => {
    difficultyOnClick();
});

/**
 * 
 * @param arr an Array of Strings
 * @returns an array of characters created from one of the argument's elements
 */
function randomWord(arr) {
    return arr[Math.floor(Math.random() * wordArray.length)].toUpperCase().split("");
}

function onClickStuff() {
    let wordTable = document.querySelector("#wordTable");
    let restartButton = document.querySelector("#restartButton");
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
        let letterCell = document.querySelector("#" + letter);
        let hangmanPic = document.querySelector("#hangmanPic");
        letterCell.addEventListener("click", () => {
            if (!guessedLetters.includes(letter.toUpperCase())) {
                guessedLetters.push(letter.toUpperCase());
                letterCell.style.backgroundColor = grey;
                if (correctWord.includes(letter.toUpperCase())) {
                    correctWord.forEach((element) => {
                        updateCorrectWord(element, letter);
                    });
                }
                else {
                    hangmanPic.src = "images/" + hangmanNumber + ".jpg";
                    hangmanNumber++;
                }


                if (isGameWon()) {
                    //alert("YOU WIN!\nANSWER: " + correctWord.join(""));
                    runWinScreen();
                }
                if (isGameLost()) {
                    //alert("YOU LOSE!\nANSWER: " + correctWord.join(""));
                    runLoseScreen();
                }
            }
        });
    });

    restartButton.addEventListener("click", () => {
        location.reload();
    });
}

function updateCorrectWord(element, letter) {
    if (element === letter.toUpperCase()) {

        let wordCellGroup = document.querySelectorAll("#" + element.toUpperCase() + "Space");
        for (wordCell of wordCellGroup) {
            wordCell.textContent = letter.toUpperCase();
        }
    }
}
function isGameLost() {
    let hangmanImg = document.querySelector("#hangmanPic").src;
    return hangmanImg.slice(hangmanImg.length - 13) === "/images/6.jpg";
}
function isGameWon() {
    return correctWord.every(element => guessedLetters.includes(element));
}

function runWinScreen() {
    let gameBox = document.querySelector("#gameBox");
    let overBox = document.querySelector("#overBox");
    let gameOverHeader = document.querySelector("#gameOverHeader");
    let correctWordText = document.querySelector("#correctAnswer");
    gameOverHeader.textContent = "YOU WIN!";
    gameBox.style.display = "none";
    overBox.style.display = "block";
    correctWordText.textContent = correctWord.join("");
}

function runLoseScreen() {
    let gameBox = document.querySelector("#gameBox");
    let overBox = document.querySelector("#overBox");
    let gameOverHeader = document.querySelector("#gameOverHeader");
    let correctWordText = document.querySelector("#correctAnswer");
    gameOverHeader.textContent = "YOU LOSE!"
    gameBox.style.display = "none";
    overBox.style.display = "block";
    correctWordText.textContent = correctWord.join("");
}



function difficultyOnClick() {
    let easyButton = document.querySelector("#easyButton");
    let mediumButton = document.querySelector("#mediumButton");
    let hardButton = document.querySelector("#hardButton");
    
    easyButton.addEventListener("click", () => {loadWords(difficulty.easy)})
    mediumButton.addEventListener("click", () => {loadWords(difficulty.medium)});
    hardButton.addEventListener("click", () => {loadWords(difficulty.hard)});   
}

function loadWords(num) {
    fetch("http://localhost:3000/wordArray")
    .then(res => res.json())
    .then(js => {
        wordArray = js.filter((element) => {
            switch(num){
                case 1:
                    if(element.length <= 5) {
                        return element;
                    }
                    break;
                case 2:
                    if(element.length > 5 && element.length <= 9) {
                        return element;
                    }
                    break;
                case 3:
                    if(element.length > 9) {
                        return element;
                    }
                    break;
            }
        });
        correctWord = randomWord(wordArray);
        onClickStuff();
        document.querySelector("#startBox").style.display = "hidden";
        document.querySelector("#gameBox").style.display = "block";
    });
}