function registerClickHandler(buttonId, labelText) {
    const message = `Button clicked: ${labelText}`;

    // The arrow function retains access to 'message' long after registerClickHandler has finished running
    document.querySelector(buttonId).addEventListener("click", () => {
        console.log(message);
    });
}

registerClickHandler("#save-btn", "Save Document");