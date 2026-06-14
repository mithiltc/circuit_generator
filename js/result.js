document.addEventListener("DOMContentLoaded", () => {

    const image = document.getElementById("circuitImage");
    const suggestions = document.getElementById("suggestions");
    const toolUsed = document.getElementById("toolUsed");
    const downloadBtn = document.getElementById("downloadCircuit");

    const result = JSON.parse(
        localStorage.getItem("generatedResult")
    );

    const selectedTool = localStorage.getItem(
        "selectedTool"
    );

    if (!result) {
        alert("No generated circuit found.");
        return;
    }

    if (toolUsed) {
        toolUsed.innerText = selectedTool;
    }

    // Full image URL
    const imageUrl =
        "http://127.0.0.1:8000" +
        result.image_url;

    // Display image
    if (image) {
        image.src = imageUrl;
    }

    // Display suggestions
if (result.suggestions && suggestions) {

    suggestions.innerHTML = "";

    if (Array.isArray(result.suggestions)) {

        result.suggestions.forEach(item => {

            const li = document.createElement("li");
            li.textContent = item;
            suggestions.appendChild(li);

        });

    } 
    
    else {

        const pre = document.createElement("pre");

        pre.style.whiteSpace = "pre-wrap";
        pre.style.wordBreak = "break-word";

        pre.textContent = result.suggestions;

        suggestions.appendChild(pre);

    }

}

    // Download image
    if (downloadBtn) {

        downloadBtn.addEventListener(
            "click",
            async () => {

                try {

                    const response =
                        await fetch(imageUrl);

                    const blob =
                        await response.blob();

                    const blobUrl =
                        URL.createObjectURL(blob);

                    const link =
                        document.createElement("a");

                    link.href = blobUrl;

                    link.download =
                        "generated_circuit.png";

                    document.body.appendChild(link);

                    link.click();

                    document.body.removeChild(link);

                    URL.revokeObjectURL(blobUrl);

                } catch (error) {

                    console.error(
                        "Download failed:",
                        error
                    );

                    alert(
                        "Unable to download the image."
                    );

                }

            }
        );

    }

});