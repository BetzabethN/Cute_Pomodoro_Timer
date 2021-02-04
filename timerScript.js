var minutes;
var seconds;

function study() {
    minutes = 25;
    seconds = 0;

    var interval = setInterval(
        function() {
            var el = document.getElementById("timer")
            if (seconds == 0) {
                minutes = minutes -1;
                seconds = 59;
                el.innerHTML = minutes + ":" + seconds;
            } else if (minutes > 0) {
                seconds = seconds - 1;
                el.innerHTML = minutes + ":" + seconds;

            }

        },
        1000
    )

}