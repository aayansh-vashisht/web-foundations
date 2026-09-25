const settings = {
    theme: "dark",
    fontSize: 16
    // sound is undefined
};

// Basic extraction, renaming (fontSize -> size), and default value (sound)
const { theme, fontSize: size, sound = true } = settings;

console.log(theme); // "dark"
console.log(size);  // 16
console.log(sound); // true (fell back to default)