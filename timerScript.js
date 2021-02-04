var minutes;
var seconds;
var rminutes;
var rseconds;
const p_title =  document.querySelector('#pomodoro-title');

function study() {
    minutes = 25;
    seconds = 0;
    p_title.innerText = "Study or Work!";
    document.getElementById("#pomodoro-pic").src = "images/in-session.png";

    var interval = setInterval(
        function() {
            var el = document.getElementById("timer")
            // if countdown in done, clear it, and alert
            if (seconds == 0 && minutes == 0) {
                clearInterval(interval);
                el.innerHTML = "00:00";
                el.style.backgroundColor = "red";
                p_title.innerText = "Ready to start again?";
                document.getElementById("#pomodoro-pic").src = "images/pause-session.png";
            }
            // if seconds is done, minus a minute
            else if (seconds == 0) {
                minutes = minutes - 1;
                seconds = 59;
                el.innerHTML = minutes + ":" + seconds;
                // change doc title so if in another tab, can still see time left
                document.title = minutes + ":" + seconds;
            }
            // as long as there is seconds left, subtract seconds
            else if (seconds > 0) {
                seconds = seconds - 1;
                el.innerHTML = minutes + ":" + seconds;
                // change doc title so if in another tab, can still see time left
                document.title = minutes + ":" + seconds;
            }
        },
        1000
    )
};

function rest() {
    rminutes = 5;
    rseconds = 0;
    p_title.innerText = "Rest!";
    document.getElementById("#pomodoro-pic").src = "images/rest.png";

    var interval = setInterval(
        function() {
            var el = document.getElementById("timer")
            // if countdown in done, clear it, and alert
            if (rseconds == 0 && rminutes == 0) {
                clearInterval(interval);
                el.innerHTML = "00:00";
                el.style.backgroundColor = "red";
                p_title.innerText = "Ready to start again?";
                document.getElementById("#pomodoro-pic").src = "images/pause-session.png";
            }
            // if seconds is done, minus a minute
            else if (rseconds == 0) {
                rminutes = rminutes - 1;
                rseconds = 59;
                el.innerHTML = rminutes + ":" + rseconds;
                // change doc title so if in another tab, can still see time left
                document.title = rminutes + ":" + rseconds;
            }
            // as long as there is seconds left, subtract seconds
            else if (rseconds > 0) {
                rseconds = rseconds - 1;
                el.innerHTML = rminutes + ":" + rseconds;
                // change doc title so if in another tab, can still see time left
                document.title = rminutes + ":" + rseconds;
            }
        },
        1000
    )
};