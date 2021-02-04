var minutes;
var seconds;

function studyBreak(x) {
    minutes = x;
    seconds = 0;

    var interval = setInterval(
        function() {
            var el = document.getElementById("timer")
            // if countdown in done, clear it, and alert
            if (seconds == 0 && minutes == 0) {
                clearInterval(interval);
                el.innerHTML = "00:00";
                el.style.backgroundColor = "red";
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