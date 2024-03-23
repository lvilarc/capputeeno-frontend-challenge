"use client"

import styled from "styled-components"
import { ShoppingBagProductCard } from "./shoppingbag-product-card"

import { useCart } from "@/hooks/useCart";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";


const queryClient = new QueryClient();

const ProductsContainer = styled.div`
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

interface ShoppingBagProductsListProps {
    ids: string[]
}

function ShoppingBagProductsList(props: ShoppingBagProductsListProps) {
    const { data: initialData } = useCart(props.ids);
    const [cartData, setCartData] = useState(initialData);

    useEffect(()=>{
        setCartData(initialData)
    }, [initialData])
    
    const removeItemFromData = (itemId: string) => {
        if (!cartData) {
            return; 
        }
    
        const newCartData: { [key: string]: Product } = { ...cartData };
    
        Object.keys(newCartData).forEach(key => {
            if (newCartData[key].id === itemId) {
                delete newCartData[key];
            }
        });
    
        setCartData(newCartData);
    };


    return (
        <ProductsContainer>
            {cartData && Object.values(cartData).map(product => (
                product && (
                    <ShoppingBagProductCard
                        key={product.id}
                        id={product.id}
                        img={product.image_url}
                        title={product.name}
                        price={product.price_in_cents}
                        description={product.description}
                        removeItemFromData={removeItemFromData} // Pass the function as a prop
                    />
                )
            ))}
        </ProductsContainer>
    )
}

export function ShoppingBagProductsListWrapper(props: ShoppingBagProductsListProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <ShoppingBagProductsList ids={props.ids} />
        </QueryClientProvider>
    )
}