const pomodoroTimer = document.querySelector('#pomodoro-timer');
const startButton = document.querySelector('#t-start');
const pauseButton = document.querySelector('#t-pause');
const stopButton = document.querySelector('#t-stop');
const title = document.querySelector('#pomodoro-title');
let type = 'Work';

// add event listeners to buttons
// START
startButton.addEventListener('click', () => {
    toggleClock();
})

// PAUSE
pauseButton.addEventListener('click', () => {
    toggleClock();
})

// STOP
stopButton.addEventListener('click', () => {
    toggleClock();
})


let isClockRunning = false;

// work session durations in second
let workSessionDuration = 1500;
let currentTimeLeftInSession = 1500;

// break session in seconds
let breakSessionDuration = 300;


// function to toggle functions of clock
const toggleClock = (reset) => {
    // takes one argument, reset, which gets passed
    // only when stopping the timer, otherwise
    // look at the value of the variable
    if (reset) {
        // stop the timer
        stopClock();
    } else {
        if (isClockRunning === true) {
            // pause the timer
            isClockRunning = false;
            clearInterval(clockTimer);
            title.innerText = "Ready to start again?...";
            document.getElementById('pomodoro-pic').src = "/images/pause-session.png";

        } else {
            // start the timer
            isClockRunning = true;
            clockTimer = setInterval(() => {
                // decrease time left
                stepDown();
                displayCurrentTimeLeftInSession();
            }, 1000);
        }
    }
}


// display time left in current session
const displayCurrentTimeLeftInSession = () => {
    const secondsLeft = currentTimeLeftInSession;
    let result = '';
    const seconds = secondsLeft % 60;
    const minutes = parseInt(secondsLeft / 60) % 60;
    let hourse = parseInt(secondsLeft / 3600);
    // add leading zeros if time is less than 10
    function addLeadingZeros(time) {
        return time < 10 ? `0${time}` : time
    }
    if (hours > 0) result += `${hourse}:`
    result += `${addLeadingZeros(minutes)}:${addLeadingZeros(seconds)}`
    pomodoroTimer.innerText = result.toString();
}

// function to stop clock
const stopClock = () => {
    // reset timer
    clearInterval(clockTimer);
    // timer is stopped
    isClockRunning = false;
    // reset time left in session
    currentTimeLeftInSession = workSessionDuration;
    // update timer displayed
    displayCurrentTimeLeftInSession();
    // reset title and pic
    title.innerText = 'Ready?';
    document.getElementById('pomodoro-pic').src = "/images/before-start.png";
    type = 'Work'; 
}

const stepDown = () => {
    if (currentTimeLeftInSession > 0) {
        // decrease time left in session
        currentTimeLeftInSession--;
    } else if (currentTimeLeftInSession === 0) {
        // timer is over, if work switch to break or vice versa
        if (type === 'Work') {
            currentTimeLeftInSession = breakSessionDuration;
            type = 'Break'
            title.innerText = 'Rest!';
            document.getElementById('pomodoro-pic').src = "/images/rest.png";
        } else {
            currentTimeLeftInSession = workSessionDuration;
            type = 'Work';
            title.innerText = 'Study or Work!';
            document.getElementById('pomodoro-pic').src = "/images/in-session.png";
        }
    }
    displayCurrentTimeLeftInSession();
}