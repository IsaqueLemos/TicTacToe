document.addEventListener('DOMContentLoaded', () => {

    let squares = document.querySelectorAll('.square');
    let restart = document.querySelector('.restart');
    let volume = document.querySelector('.volume');
    let audio = document.getElementById('audio');
    audio.play()
    audio.volume = 0.25;
    
    squares.forEach((element) => {
        element.addEventListener('click', handleClick);
    })
    restart.addEventListener('click', restartGame);
    volume.addEventListener('click', muteDesmute);
})

function handleClick(event) {
    let square = event.target;
    let position = square.id;
    let winner = document.querySelector('.winner');
    let gameOverSong = new Audio();
    let crossSong = new Audio();
    let circleSong = new Audio();
    gameOverSong.src = './audio/GameOver.wav';
    crossSong.src = './audio/Cross.wav';
    circleSong.src = './audio/Circle.wav';

    if (playerTime == 0) {
        crossSong.play();
    } else {
        circleSong.play();
    }

    if (handleMove(position)) {
        setTimeout(() => {
            gameOverSong.play();
            if (playerTime == 0) {
                winner.innerHTML = `<img src="./images/multiply_2716-fe0f.png" alt="cross"> WON`
            } else {
                winner.innerHTML = `<img src="./images/hollow-red-circle_2b55.png" alt="circle"> WON`
            }
        }, 100);
    }

    updateSquare(position);
}

function updateSquare(position) {
    let square = document.getElementById(position.toString());
    let symbol = board[position];
    square.innerHTML = `<div class="${symbol}"></div>`;
}

function restartGame() {
    let squares = document.querySelectorAll('.square');
    let winner = document.querySelector('.winner');
    let restartSong = new Audio()
    restartSong.src = './audio/Restart.wav'
    restartSong.play()

    squares.forEach((element) => {
        let position = element.id;
        let symbol = board[position];

        if (symbol != '') {
            element.innerHTML = `<div class=""></div>`
        }

    })

    winner.innerHTML = 'WINNER'
    gameOver = false;
    board = ['', '', '', '', '', '', '', '', ''];
    playerTime = 0;
}

function muteDesmute() {
    let volume = document.querySelector('.volume');
    let audio = document.querySelector('#audio');
    if (audio.muted == false) {
        audio.muted = true;
        volume.innerHTML = '<img src="images/bxs-volume-mute.svg" alt="volume-mute">'
    } else {
        audio.muted = false;
        audio.play(); // Chrome sometimes rejects the autoplay.
        volume.innerHTML = '<img src="images/bxs-volume-full.svg" alt="volume-full">'
    }
}