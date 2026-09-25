const dynamicKey = "role";
const userId = 42;

const member = {
    name: "Taylor",
    [dynamicKey]: "Editor",       // Evaluates to: role: "Editor"
    [`id_${userId}`]: true        // Evaluates to: id_42: true
};

console.log(member);
// { name: "Taylor", role: "Editor", id_42: true }