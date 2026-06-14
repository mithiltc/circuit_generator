document.addEventListener("DOMContentLoaded", async () => {


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

    if (current < messages.length) {

        statusText.innerText =
            messages[current];

        current++;

    }

}, 1000);

const description =
    localStorage.getItem(
        "circuitDescription"
    );

const tool =
    localStorage.getItem(
        "selectedTool"
    );

try {

    console.log(
        "Sending request..."
    );

    const response = await fetch(
        "http://127.0.0.1:8000/generate",
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                description,
                tool
            })
        }
    );

    const data =
        await response.json();

    console.log(
        "API RESPONSE:",
        data
    );

    localStorage.setItem(
        "generatedResult",
        JSON.stringify(data)
    );

    clearInterval(interval);

    setTimeout(() => {

        window.location.href =
            "result.html";

    }, 1000);

}

catch (error) {

    console.error(
        "API ERROR:",
        error
    );

    clearInterval(interval);

    statusText.innerText =
        "Generation Failed";

}
});
