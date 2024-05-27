document.addEventListener('DOMContentLoaded', (event) => {
    const mario = document.querySelector('.mario');
    const pipe = document.querySelector('.pipe');
    const scoreDisplay = document.getElementById('score');
    
    let isJumping = false;
    let score = 0;
    let scoreInterval;

    const jump = () => {
        if (isJumping) return;
        isJumping = true;
        mario.classList.add('jump');

        setTimeout(() => {
            mario.classList.remove('jump');
            isJumping = false;
        }, 500);
    }

    const updateScore = () => {
        score += 1;
        scoreDisplay.textContent = `Score: ${score}`;
    }

    const loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
        
        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`; 

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`; 

            mario.src = 'img/game-over.png';
            mario.style.width = '75px';
            mario.style.marginLeft = '50px';

            clearInterval(loop);
            clearInterval(scoreInterval);
        } 
    }, 10);

    document.addEventListener('keydown', jump);

    scoreInterval = setInterval(updateScore, 1000); // Incrementa a pontuação a cada segundo
});
