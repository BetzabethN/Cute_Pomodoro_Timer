// when window loads, create a new pomodoro timer
window.onload = function () {
    const displayT = document.querySelector("#pomodoro-timer");
    var timer = new Pomodoro({ displayT });
    timer.init();
};

var Pomodoro = (function () {
    function Pomodoro(args = {}) {
        const {
            workMinutes,
            shortBreakMinutes,
            longBreakMinutes,
            displayT,
        } = args;

        //times for work and breaks
        this.workSeconds = workMinutes * 60 || (25 * 60);
        this.shortBreakSeconds = shortBreakMinutes * 60 || (5 * 60);
        this.longBreakSeconds = longBreakMinutes * 60 || (15 * 60);

        // to track how long you have been working
        this.checkMarks = 0;
        this.isValid = true;
        this.running = false;
        this.interval = null;
        this.lastTick = null;
        this.secondsElapsed = 0;
        this.timerLength = null;
        // to display whether study/working or on break
        this.timerType = "Study or Work!";
        this.displayT = displayT;
    }
    return Pomodoro;
})();

Pomodoro.prototype.init = function () {
    this.timerLength = this.workSeconds;
    let res = document.createElement("div");
    res.classList.add("clock");
    res.id = "clock";
    this.displayT.appendChild(res);
    this.resultsT = document.querySelector("#pomodoro-timer");

    //start button
    let start = document.createElement("button");
    start.innerHTML = "Start";
    this.displayT.appendChild(start);
    start.addEventListener("click", () => timer.startTimer());

    // button for pause
    let pause = document.createElement("button");
    pause.innerHTML = "Pause";
    this.displayT.appendChild(pause);
    pause.addEventListener("click", () => this.togglePause());

    // button for  stop
    let stop = document.createElement("button");
    stop.innerHTML = "Stop";
    this.displayT.appendChild(stop);
    stop.addEventListener("click", () => this.toggleStop());
};

// function to change the timer type
Pomodoro.prototype.flipTimerType = function () {
    return (this.timerType = this.timerType === "Study or Work!" ? "Break!" : "Study or Work!");
};

Pomodoro.prototype.isWork = function () {
    return this.timerType === "Study or Work!";
};

Pomodoro.prototype.isBreak = function () {
    return this.timerType === "Break!";
};

Pomodoro.prototype.displayTime = function () {
    this.displayT.innerHTML = `${this.timerType}! time left: ${Math.ceil(this.timerLength - this.secondsElapsed)} checkMarks: ${this.checkMarks}`;
};

Pomodoro.prototype.wasValidPomodoro = function () {
    return this.isValid === true;
};

Pomodoro.prototype.displayTime = function () {
    this.resultsT.innerHTML = `<b>${this.timerType}!</b>${nTimes("&#10004;", this.checkMarks).join(" ")}<br />time left: ${formatTime(Math.floor(this.timerLength - this.secondsElapsed))}<br />successful pomodoros: ${this.pomodoroCount}`;
};

Pomodoro.prototype.startTimer = function () {
    this.secondsElapsed = 0;
    this.lastTick = Date.now();
    this.running = true;
    this.isValid = true;
    this.interval = setInterval(() => {
        this.updateTime();
        this.displayTime();
    }, 1000);
};

// function to  update timer
Pomodoro.prototype.updateTime = function () {
    if (!this.running) {
        return false;
    }
    this.secondsElapsed += (Date.now() - this.lastTick) / 1000;
    if (this.timerLength - this.secondsElapsed < 0) {
        this.running = false;
        return this.timerEnded();
    }
    this.lastTick = Date.now();
};

// timer ended so start new timer interval
Pomodoro.prototype.timerEnded = function () {
    clearInterval(this.interval);

    // if timer was work, show new checkmark
    if (this.isWork()) {
        // timer for break
        if (this.wasValidPomodoro()) {
            this.checkMarks++;
        }
        if (this.checkMarks === 4) {
            // time for long break
            this.timerLength = this.longBreakSeconds;
            this.checkMarks = 0;
        } else {
            this.timerLength = this.shortBreakSeconds;
        }
    } else {
        // time for work/study
        this.timerLength = this.workSeconds;
    }
    this.flipTimerType();
    this.startTimer();
}

Pomodoro.prototype.togglePause = function () {
    if (this.running) {
        this.running = false;
        clearInterval(this.interval);
    } else {
        this.running = true;
        this.interval = setInterval(() => {
            this.updateTime();
            this.displayTime();
        }, 1000);
    }
};

Pomodoro.prototype.toggleStop = function () {
    // restart everything
    this.checkMarks = 0;
    this.isValid = true;
    this.running = false;
    this.interval = null;
    this.lastTick = null;
    this.secondsElapsed = 0;
    this.timerLength = null;
    // to display study/working at restart
     this.timerType = "Study or Work!";
    this.displayT = displayT;
}