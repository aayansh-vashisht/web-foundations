const ages = [19, 24, 32, 17];
const allAdults = ages.every((age) => age >= 18);

console.log(allAdults); // false (because 17 is < 18)