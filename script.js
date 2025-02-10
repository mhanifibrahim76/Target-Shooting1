// Select DOM elements
const box = document.querySelectorAll('.box');
const target = document.querySelectorAll('.target');
const scoreAgent = document.querySelector('.score-agent');
const kill = document.querySelector('#kill');

// Variables for game state
let boxBefore; // Keeps track of the previous box
let finish; // Indicates whether the game is finished
let score; // Stores the current score

// Function to pick a random box
function randomBox(box) {
    let bRandom;
    do {
        bRandom = box[Math.floor(Math.random() * box.length)];
    } while (bRandom === boxBefore);
    boxBefore = bRandom;
    return bRandom;
}

// Function to generate a random time within a range
function randomTime(max, min) {
    return Math.round(Math.random() * (max - min) + min);
}

// Function to make a target appear and disappear
function popTarget() {
    const bRandom = randomBox(box); // Get a random box
    const time = randomTime(150, 1000); // Get a random time
    bRandom.classList.add('up'); // Show the target

    setTimeout(() => {
        bRandom.classList.remove('up'); // Hide the target
        if (!finish) {
            popTarget(); // Continue if the game is not finished
        }
    }, time);
}

// Start the game
function Start() {
    finish = false; // Reset game state
    score = 0; // Reset score
    scoreAgent.textContent = score; // Display initial score
    popTarget(); // Start showing targets

    // End the game after 10 seconds
    setTimeout(() => {
        finish = true;
        alert(`Game Over! Your score is ${score}`); // Show final score
    }, 10000);
}

function playSoundDynamic() {
    const audio = new Audio('audio/multikill.mp3');
    audio.play();
    audio.onended = () => {
        audio.remove(); // Hapus elemen audio setelah selesai
    };
}


function hit() {
    if (!this.parentNode.classList.contains('up')) return; // Cegah multi-klik
    score++; // Tingkatkan skor
    playSoundDynamic(); // Putar suara dinamis
    this.parentNode.classList.remove('up'); // Sembunyikan target
    scoreAgent.textContent = score; // Perbarui skor di tampilan
}


// Add event listeners to targets
target.forEach(t => {
    t.addEventListener('click', hit);
});
