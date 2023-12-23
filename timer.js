document.addEventListener("DOMContentLoaded", function () {
  const timeDisplay = document.getElementById("timeDisplay");
  const startBtn = document.getElementById("startBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const restartBtn = document.getElementById("restartBtn");

  let startTime = 0;
  let elapsedTime = 0;
  let currentTime = 0;
  let paused = true;
  let intervalId;
  let hrs = 0;
  let mins = 0;
  let secs = 0;

  startBtn.addEventListener("click", () => {
    if (paused) {
      paused = false;
      startTime = Date.now() - elapsedTime;
      intervalId = setInterval(updateTime, 1000);
    }
  });
  pauseBtn.addEventListener("click", () => {
    if (!paused) {
      paused = true;
      elapsedTime = Date.now() - startTime;
      clearInterval(intervalId);
    }
  });
  restartBtn.addEventListener("click", () => {
    paused = true;
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;
    hrs = 0;
    mins = 0;
    secs = 0;
    timeDisplay.textContent = "00:00:00";
  });

  function updateTime() {
    elapsedTime = Date.now() - startTime;
    secs = Math.floor((elapsedTime / 1000) % 60);
    mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

    secs = pad(secs);
    hrs = pad(hrs);
    mins = pad(mins);

    timeDisplay.textContent = `${hrs}:${mins}:${secs}`;
  }

  function pad(unit) {
    return unit.toString().length > 1 ? unit : "0" + unit;
  }
});
