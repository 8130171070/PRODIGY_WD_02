let startTime, interval;
let running = false;

const timeDisplay = document.getElementById('time');
const startStopBtn = document.getElementById('startStop');
const lapBtn = document.getElementById('lap');
const resetBtn = document.getElementById('reset');
const lapList = document.getElementById('lap-list');
const secondHand = document.getElementById('second-hand');

let elapsed = 0;

startStopBtn.addEventListener('click', () => {
  if (!running) {
    startTime = Date.now() - elapsed;
    interval = setInterval(updateTime, 10);
    running = true;
    startStopBtn.textContent = 'Stop';
  } else {
    clearInterval(interval);
    running = false;
    startStopBtn.textContent = 'Start';
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(interval);
  elapsed = 0;
  running = false;
  timeDisplay.textContent = '00:00:00.000';
  secondHand.style.transform = `rotate(0deg)`;
  startStopBtn.textContent = 'Start';
  lapList.innerHTML = '';
});

lapBtn.addEventListener('click', recordLap);

function updateTime() {
  elapsed = Date.now() - startTime;
  let time = new Date(elapsed);
  let min = time.getUTCMinutes().toString().padStart(2, '0');
  let sec = time.getUTCSeconds().toString().padStart(2, '0');
  let ms = time.getUTCMilliseconds().toString().padStart(3, '0');
  timeDisplay.textContent = `00:${min}:${sec}.${ms}`;

  let degrees = (elapsed / 1000) * 6; // 6 degrees per second
  secondHand.style.transform = `rotate(${degrees}deg)`;
}

function recordLap() {
  const lapTime = document.createElement('li');
  lapTime.textContent = timeDisplay.textContent;

  if (lapList.children.length >= 5) {
    lapList.removeChild(lapList.firstChild);
  }

  lapList.appendChild(lapTime);
}