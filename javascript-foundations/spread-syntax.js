function calculateVolume(length, width, height) {
    return length * width * height;
}

const boxDimensions = [5, 2, 10];

// Spreading the array directly into the function arguments:
const volume = calculateVolume(...boxDimensions);
// Equivalent to: calculateVolume(5, 2, 10)

console.log(volume); // 100