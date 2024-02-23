"use client"

import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./product-card";
import styled from "styled-components";


const ProductsCardsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 256px);
    grid-gap: 30px;
    width: 100%;
    margin-top: 30px;
    justify-content: center;
`;



export function ProductsList() {
    const { data } = useProducts()
    console.log(data)

    return (
        <ProductsCardsContainer>
            {data?.map(product =>
                <ProductCard
                    key={product.id}
                    title={product.name}
                    price={product.price_in_cents}
                    img={product.image_url}
                />
            )}
        </ProductsCardsContainer>
    );
}
// display: flex;
    // gap: 30px;
    // flex-wrap: wrap;
    // justify-content: center;
    // padding: 40px;