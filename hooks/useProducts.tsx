import { ProductsFetchResponse } from "@/types/products-response";
import axios, { AxiosPromise } from "axios";
import { useQuery } from '@tanstack/react-query'
import { useFilter } from "./useFilter";
import { buildQuery } from "@/utils/build-query";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

const fetcher = (query: string): AxiosPromise<ProductsFetchResponse> => {
    return axios.post(
        API_URL,
        {
            query: query
        }

    )
}

export function useProducts() {
    const {type, priority} = useFilter();
    const query = buildQuery(type, priority);
    const { data } = useQuery({
        queryFn: () => fetcher(query),
        queryKey: ['products', type, priority]
    })

    return {
        data: data?.data?.data?.allProducts
    }
}

`query {
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