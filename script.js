const startBtn = document.getElementById('startButton');
const musicBtn = document.getElementById('musicButton');
const capybara = document.getElementById('capybara');
const capybaraImg = capybara.querySelector('img');
const info = document.getElementById('info');
const videoContainer = document.getElementById('videoContainer');
const bgMusic = document.getElementById('bgMusic');
const clickSound = document.getElementById('clickSound');
const gameContainer = document.getElementById('gameContainer');

let isDancing = true;
let isMusicOn = true;
let isGameStarted = false;
let timer = 4;
let score = 0;
let capybaraMoveIntervalId = null;
let psychedelicTimeoutId, shakeTimeoutId, timerIntervalId;
let isPsychedelicActive = false;
let isPrePsychedelicActive = false;
let isShaking = false;
let flipDirection = 1;

function requestFullscreen(element) {
  if (element.requestFullscreen) element.requestFullscreen();
  else if (element.mozRequestFullScreen) element.mozRequestFullScreen();
  else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
  else if (element.msRequestFullscreen) element.msRequestFullscreen();
}

function moveCapybara() {
  const randomX = Math.random() * 80;
  const randomY = Math.random() * 80;
  const randomSize = Math.random() * 50 + 50;
  const randomScale = Math.random() * 0.5 + 0.6;

  flipDirection *= -1;

  capybara.style.display = 'block';
  capybara.style.top = `${randomY}vh`;
  capybara.style.left = `${randomX}vw`;
  capybara.style.width = `${randomSize}px`;
  capybara.style.height = `${randomSize}px`;
  capybara.style.transform = `scale(${randomScale})`;
  capybaraImg.style.transform = `scaleX(${flipDirection})`;
}

function updateInfo() {
  info.textContent = `Score: ${score} | Remaining Time: ${timer}s`;
}

function handleCapybaraClick() {
  if (!isGameStarted) return;
  score++;
  updateInfo();
  moveCapybara();
  clickSound.play();

  if (capybaraMoveIntervalId) clearInterval(capybaraMoveIntervalId);
  capybaraMoveIntervalId = setInterval(moveCapybara, 1000);
}

function toggleMusic() {
  isMusicOn = !isMusicOn;
  bgMusic.muted = !isMusicOn;
  clickSound.muted = !isMusicOn;
  musicBtn.textContent = isMusicOn ? 'Mute' : 'Unmute';
}

function endGame() {
    isGameStarted = false;
    isDancing = false;
    isMusicOn = false;
    isPsychedelicActive = false;
    isPrePsychedelicActive = false;
    isShaking = false;
  
    // Stop music
    bgMusic.pause();
    bgMusic.currentTime = 0;
  
    // Stop all intervals and timeouts
    clearInterval(timerIntervalId);
    clearInterval(capybaraMoveIntervalId);
    clearTimeout(psychedelicTimeoutId);
    clearTimeout(shakeTimeoutId);
  
    // Hide game elements
    capybara.classList.add('hidden');  // use class if supported in CSS
    capybara.style.display = 'none';
    capybara.style.visibility = 'hidden';
  
    musicBtn.style.display = 'none';
    startBtn.style.display = 'none';
    videoContainer.style.display = 'none';
  
    // Reset game container visual effects
    gameContainer.classList.remove('psychedelicActive', 'prePsychedelicActive', 'shakingBackground');
  
    // Show final score in center
    info.textContent = `Game Over! Your final score: ${score}`;
    info.style.display = 'block';
    info.style.position = 'absolute';
    info.style.top = '50%';
    info.style.left = '50%';
    info.style.transform = 'translate(-50%, -50%)';
    info.style.fontSize = '32px';
    info.style.textAlign = 'center';
    info.style.color = 'white';
  }
  
function startGame() {
  isGameStarted = true;
  timer = 45;
  score = 0;
  isDancing = true;
  isMusicOn = true;
  isPsychedelicActive = false;
  isPrePsychedelicActive = true;
  isShaking = false;

  requestFullscreen(document.documentElement);

  bgMusic.play();
  moveCapybara();

  updateInfo();
  info.style.display = 'block';
  musicBtn.style.display = 'inline-block';
  musicBtn.textContent = 'Mute';
  startBtn.style.display = 'none';

  gameContainer.classList.add('prePsychedelicActive');

  timerIntervalId = setInterval(() => {
    timer--;
    updateInfo();
    if (timer <= 0) endGame();
  }, 1000);

  psychedelicTimeoutId = setTimeout(() => {
    isPrePsychedelicActive = false;
    isPsychedelicActive = true;
    gameContainer.classList.remove('prePsychedelicActive');
    gameContainer.classList.add('psychedelicActive');
  }, 5000);

  shakeTimeoutId = setTimeout(() => {
    isShaking = true;
    gameContainer.classList.add('shakingBackground');
  }, 15000);
}

startBtn.addEventListener('click', startGame);
musicBtn.addEventListener('click', toggleMusic);
capybara.addEventListener('click', handleCapybaraClick);
