"use client"

import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./product-card";
import styled from "styled-components";
import { useFilter } from "@/hooks/useFilter";
import { useEffect } from "react";
import Link from "next/link";


const ProductsCardsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 256px);
    grid-gap: 30px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
    justify-content: center;
`;



export function ProductsList() {
    const { data } = useProducts()
    const { page, setPages } = useFilter();

    const productsPerPage = 12;

    useEffect(() => {
        setPages(calculateTotalPages());
    }, [data]);

    const calculateTotalPages = () => {
        if (data && data.length > 0) {
            return Math.ceil(data.length / productsPerPage);
        }
        return 0;
    };

    const renderProductsForPage = () => {
        if (!data || data.length === 0) {
            return null;
        }

        const startIndex = (page - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;

        return data.slice(startIndex, endIndex).map(product => (
            <Link href={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit'}} key={product.id}>
                <ProductCard
                    key={product.id}
                    title={product.name}
                    price={product.price_in_cents}
                    img={product.image_url}
                />
            </Link>
        ));
    };

    return (
        <ProductsCardsContainer>
            {renderProductsForPage()}
        </ProductsCardsContainer>
    );
}
