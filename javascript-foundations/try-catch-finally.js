let isLoading = true;

try {
    console.log("Attempting to parse user profile...");
    const rawData = '{"name": "Dev", "invalidJson: true'; // Malformed JSON
    const parsed = JSON.parse(rawData); // Throws a SyntaxError
    console.log(parsed); // Skipped
} catch (err) {
    // Gracefully handle the error
    console.warn(`Parsing failed: ${err.message}`);
} finally {
    // Always executed
    isLoading = false;
    console.log(`Finished operation. Loading state: ${isLoading}`);
}