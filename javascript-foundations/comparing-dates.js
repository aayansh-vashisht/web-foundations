const deadline = new Date("2026-10-01T00:00:00Z");
const submission = new Date("2026-09-25T12:00:00Z");
const submissionDuplicate = new Date("2026-09-25T12:00:00Z");

// Relative comparison: Works directly with <, >
if (submission < deadline) {
    console.log("Submitted before deadline!"); // Runs
}

// Equality comparison: NEVER do (submission === submissionDuplicate)
console.log(submission === submissionDuplicate); // false (different memory references!)

// Proper equality check: compare timestamps
const isSameTime = submission.getTime() === submissionDuplicate.getTime();
console.log(isSameTime); // true