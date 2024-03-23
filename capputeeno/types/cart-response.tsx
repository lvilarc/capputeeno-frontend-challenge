import { Product } from "./product"

export interface CartFetchResponse {
    data: {
        [key: string]: Product;
    };
}