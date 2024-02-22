import { ProductsFetchResponse } from "@/types/products-response";
import axios, { AxiosPromise } from "axios";
import { useQuery } from '@tanstack/react-query'

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

const fetcher = (): AxiosPromise<ProductsFetchResponse> => {
    return axios.post(
        API_URL,
        {
            query: `query {
                allProducts {
                 name
                  sales
                  category
                  image_url
                  created_at
                  price_in_cents
                  id
                }
            }
        `
        }

    )
}

export function useProducts() {
    const { data } = useQuery({
        queryFn: fetcher,
        queryKey: ['products']
    })

    return {
        data: data?.data?.data?.allProducts
    }
}