// 1. Literal Types
type Theme = "dark" | "light"; // Only these exact values allowed

// 2. Discriminated Union Pattern
type Circle = { kind: "circle"; radius: number };
type Square = { kind: "square"; side: number };
type Shape = Circle | Square;

function calculateArea(shape: Shape): number {
    // Discriminated union narrowing via switch
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2; // TS knows this has 'radius'
        case "square":
            return shape.side * shape.side;     // TS knows this has 'side'
    }
}

// 3. Property, typeof, and Truthiness Narrowing
type Admin = { privileges: string[] };
type Guest = { isAnonymous: boolean };

function inspectValue(val: string | number | null, user: Admin | Guest): void {
    // Truthiness check
    if (!val) {
        return; // Eliminates null
    }

    // Typeof check
    if (typeof val === "string") {
        console.log(val.toUpperCase()); // TS knows it's a string
    }

    // Property check ('in')
    if ("privileges" in user) {
        console.log(user.privileges); // TS knows it's an Admin
    }
}