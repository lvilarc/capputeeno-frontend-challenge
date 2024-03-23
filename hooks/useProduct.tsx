
import axios, { AxiosPromise } from "axios";
import { useQuery } from '@tanstack/react-query'
import { ProductFetchResponse } from "@/types/product-response";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;



const fetcher = (productId: string): AxiosPromise<ProductFetchResponse> => {
    return axios.post(
        API_URL,
        {
            query: `query {
                Product(id: "${productId}") {
                    name
                    description
                    image_url
                    category
                    id
                    price_in_cents
                    sales
                    created_at
                }
            }`
        }

    )
}



export function useProduct(productId: string) {
    const { data } = useQuery({
        queryFn: () => fetcher(productId),
        queryKey: ['product'],
        enabled: !!productId,
        staleTime: 1000 * 60 * 5
    })

    return {
        data: data?.data?.data?.Product
    }
}

