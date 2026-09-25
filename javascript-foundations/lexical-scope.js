const universe = "Milky Way"; // Outer-most scope

function galaxy() {
    const system = "Solar System"; // Outer function scope

    function planet() {
        const world = "Earth"; // Inner function scope

        // Searches locally, then steps outward through parent scopes:
        console.log(`${world} is in the ${system}, part of the ${universe}.`);
    }

    planet();
    // console.log(world); // ReferenceError: outer scopes cannot look inward
}

galaxy();