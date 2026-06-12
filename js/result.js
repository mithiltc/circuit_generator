document.addEventListener("DOMContentLoaded", () => {

    const image =
        document.getElementById("circuitImage");

    const suggestions =
        document.getElementById("suggestions");

    const toolUsed =
        document.getElementById("toolUsed");

    const result =
        JSON.parse(
            localStorage.getItem(
                "generatedResult"
            )
        );

    const selectedTool =
        localStorage.getItem(
            "selectedTool"
        );

    if (!result) {

        alert(
            "No generated circuit found."
        );

        return;

    }

    if (toolUsed) {

        toolUsed.innerText =
            selectedTool;

    }

    if (
        result.image_url &&
        image
    ) {

        image.src =
            "http://127.0.0.1:8000" +
            result.image_url;

    }

    if (
        result.suggestions &&
        suggestions
    ) {

        suggestions.innerHTML = "";

        result.suggestions.forEach(
            suggestion => {

                const li =
                    document.createElement("li");

                li.textContent =
                    suggestion;

                suggestions.appendChild(
                    li
                );

            }
        );

    }

});