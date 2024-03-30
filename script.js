const box = document.querySelectorAll('.box');
const target = document.querySelectorAll('.target');
const scoreAgent = document.querySelector('.score-agent')
const kill = document.querySelector('#kill')

let boxBefore;
let finish;
let score;

function randomBox(box) {
    const b = Math.floor(Math.random() * box.length);
    const bRandom = box[b];
    if( bRandom == boxBefore ) {
        randomBox(box)
    }
    boxBefore =  bRandom;
    return bRandom;
}

function randomTime (max,min) {
    return Math.round(Math.random() * (max - min) + min);
}

function popTarget() {
    const bRandom = randomBox(box);
    randomTime (150,1000)
    bRandom.classList.add('up');

    setTimeout(() => {
     bRandom.classList.remove('up');   
     if(!finish){
        popTarget();
     }
    }, 500)
}

function Start() {
    finish = false;
    score = 0;
    scoreAgent.textContent = 0;
    popTarget();
    setTimeout(() => {
    finish = true;
    }, 10000);
}

function hit() {
    score = score + 1;
    kill.play();
    this.parentNode.classList.remove('up')
    
    scoreAgent.textContent = score;
}

target.forEach(t => {
    t.addEventListener('click', hit);
});