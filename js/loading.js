document.addEventListener("DOMContentLoaded", () => {

    const statusText =
        document.getElementById("statusText");

    const messages = [

        "Analyzing circuit requirements...",

        "Selecting components...",

        "Building circuit architecture...",

        "Generating AI suggestions...",

        "Preparing final output..."
    ];

    let current = 0;

    const interval = setInterval(() => {

        statusText.innerText =
            messages[current];

        current++;

        if (current >= messages.length) {

            clearInterval(interval);

        }

    }, 1000);

    setTimeout(() => {

        window.location.href =
            "result.html";

    }, 5000);

});