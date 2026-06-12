document.addEventListener("DOMContentLoaded", () => {

    const generateBtn = document.getElementById("generateBtn");

    generateBtn.addEventListener("click", async () => {

        const description =
            document.getElementById("description").value.trim();

        const tool =
            document.getElementById("tool").value;

        if (!description) {

            alert("Please enter a circuit description.");

            return;

        }

        localStorage.setItem(
            "circuitDescription",
            description
        );

        localStorage.setItem(
            "selectedTool",
            tool
        );

        window.location.href = "loading.html";

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/generate",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        description: description,
                        tool: tool
                    })
                }
            );

            if (!response.ok) {

                throw new Error(
                    "Failed to generate circuit"
                );

            }

            const data = await response.json();

            localStorage.setItem(
                "generatedResult",
                JSON.stringify(data)
            );

        } catch (error) {

            console.error(error);

            localStorage.setItem(
                "generatedResult",
                JSON.stringify({
                    status: "error",
                    image_url: "",
                    suggestions: [
                        "Unable to connect to backend."
                    ]
                })
            );

        }

    });

});