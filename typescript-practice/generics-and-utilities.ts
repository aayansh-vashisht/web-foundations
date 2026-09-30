// 1. Generic API Response Wrapper
interface ApiResponse<TData> {
    data: TData;
    timestamp: number;
    success: boolean;
}

interface Product {
    id: number;
    name: string;
    price: number;
}

// Generic reusable function
function wrapInResponse<T>(payload: T): ApiResponse<T> {
    return {
        data: payload,
        timestamp: Date.now(),
        success: true,
    };
}

const productResponse = wrapInResponse<Product>({ id: 1, name: "Keyboard", price: 80 });

// 2. Utility Types
type ProductPreview = Pick<Product, "id" | "name">; // Only id and name
type ProductDraft = Partial<Product>;               // All fields optional
type ProductWithoutPrice = Omit<Product, "price">;  // Removes price
type Inventory = Record<string, Product>;           // Key: string, Value: Product