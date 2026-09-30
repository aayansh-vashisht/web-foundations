// 1. Type Alias
type User = {
    id: number;
    name: string;
    email: string;
};

// 2. Interface with Optional and Readonly properties
interface BaseEntity {
    readonly id: number; // Cannot be reassigned after creation
    createdAt: Date;
}

// Extending an interface
interface CustomerProfile extends BaseEntity {
    name: string;
    phoneNumber?: string; // Optional property
}

// 3. Union Types (Better than generic strings)
type Status = "idle" | "loading" | "success" | "error";

function handleStatus(status: Status): void {
    if (status === "loading") {
        console.log("Fetching data...");
    }
}

// handleStatus("processing"); // TypeScript error: Only idle/loading/success/error allowed!