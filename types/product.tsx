export interface Product {
    name: string,
    sales: number,
    category: string,
    image_url: string,
    created_at: string,
    price_in_cents: number,
    id: string,
    description: string
}

export interface ProductInCart extends Product {
    quantity: number
}