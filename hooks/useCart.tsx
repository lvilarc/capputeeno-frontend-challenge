
import axios, { AxiosPromise } from "axios";
import { useQuery } from '@tanstack/react-query'
import { CartFetchResponse } from "@/types/cart-response";


const API_URL = process.env.NEXT_PUBLIC_API_URL as string;



const fetcher = (productIds: string[]): AxiosPromise<CartFetchResponse> => {
    const productsQuery = productIds.map((productId, index) => `
        product${index + 1}: Product(id: "${productId}") {
            name
            description
            image_url
            category
            id
            price_in_cents
            sales
            created_at
        }
    `).join('\n');

    const query = `query {
        ${productsQuery}
    }`;

    console.log('GraphQL Query:', query); 

    return axios.post(
        API_URL,
        {
            query: query
        }
    );
};







export function useCart(productIds: string[]) {
    const { data } = useQuery({
        queryFn: () => fetcher(productIds),
        queryKey: ['cart']
    })
    // console.log('data', data?.data.data)
    return {
        data: data?.data?.data
    }
}

