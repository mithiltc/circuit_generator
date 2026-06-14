document.addEventListener("DOMContentLoaded", () => {

const image = document.getElementById("circuitImage");
const toolUsed = document.getElementById("toolUsed");
const downloadBtn = document.getElementById("downloadCircuit");

const result = JSON.parse(
    localStorage.getItem("generatedResult")
);

const selectedTool = localStorage.getItem(
    "selectedTool"
);

console.log("RESULT DATA:", result);

if (!result) {

    alert("No generated circuit found.");
    return;

}

// Display selected tool
if (toolUsed) {

    toolUsed.innerText =
        selectedTool || "Not Specified";

}

// Display circuit image
if (result.image_url && image) {

    image.src =
        "http://127.0.0.1:8000" +
        result.image_url;

}

// AI Result Cards
const aiData = result.suggestions;

if (aiData) {

    document.getElementById(
        "componentsCard"
    ).innerHTML = `
        <div class="bg-white text-black p-5 rounded-xl shadow">
            <h3 class="text-xl font-bold mb-3">
                Components Required
            </h3>

            <ul class="list-disc pl-5">
                ${aiData.components
                    .map(
                        item =>
                        `<li>${item}</li>`
                    )
                    .join("")}
            </ul>
        </div>
    `;

    document.getElementById(
        "workingCard"
    ).innerHTML = `
        <div class="bg-white text-black p-5 rounded-xl shadow">
            <h3 class="text-xl font-bold mb-3">
                Circuit Working
            </h3>

            <p>
                ${aiData.working}
            </p>
        </div>
    `;

    document.getElementById(
        "designCard"
    ).innerHTML = `
        <div class="bg-white text-black p-5 rounded-xl shadow">
            <h3 class="text-xl font-bold mb-3">
                Design Suggestions
            </h3>

            <ul class="list-disc pl-5">
                ${aiData.design_suggestions
                    .map(
                        item =>
                        `<li>${item}</li>`
                    )
                    .join("")}
            </ul>
        </div>
    `;

    document.getElementById(
        "simulationCard"
    ).innerHTML = `
        <div class="bg-white text-black p-5 rounded-xl shadow">
            <h3 class="text-xl font-bold mb-3">
                Simulation Steps
            </h3>

            <ol class="list-decimal pl-5">
                ${aiData.simulation_steps
                    .map(
                        item =>
                        `<li>${item}</li>`
                    )
                    .join("")}
            </ol>
        </div>
    `;

    document.getElementById(
        "vivaCard"
    ).innerHTML = `
        <div class="bg-white text-black p-5 rounded-xl shadow">
            <h3 class="text-xl font-bold mb-3">
                Viva Questions
            </h3>

            <ol class="list-decimal pl-5">
                ${aiData.viva_questions
                    .map(
                        item =>
                        `<li>${item}</li>`
                    )
                    .join("")}
            </ol>
        </div>
    `;

}

// Download Circuit Image
if (downloadBtn) {

    downloadBtn.addEventListener(
        "click",
        async () => {

            try {

                const imageUrl =
                    "http://127.0.0.1:8000" +
                    result.image_url;

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

            }

            catch (error) {

                console.error(
                    "Download Error:",
                    error
                );

                alert(
                    "Unable to download image."
                );

            }

        }
    );

}

});