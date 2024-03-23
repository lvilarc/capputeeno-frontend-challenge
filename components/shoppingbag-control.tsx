"use client"

import { ShoppingBagIcon } from "./icons/shoppingbag-icon";
import styled from "styled-components";
import Link from "next/link";
import { useEffect } from "react";
import { useFilter } from "@/hooks/useFilter";


const ShoppingBagCount = styled.span`
    width: 20px;
    height: 20px;
    color: white;
    background-color: #DE3838;
    border-radius: 100%;
    margin-left: -30px;
    margin-top: 24px;
    display: flex;
    justify-content: center; 
    align-items: center;
    font-size: 12px;
`;
const Container = styled.div`
    position: relative; 
    cursor: pointer;
`;



export function ShoppingBagControl() {
    const { shoppingBagItems, setShoppingBagItems } = useFilter();
  
    useEffect(() => {
        const storedItems = localStorage.getItem('shoppingbag-items');
        if (storedItems) {
            setShoppingBagItems(JSON.parse(storedItems));
           
        }
    }, []);

    return (
        <Link href='/cart' style={{ textDecoration: 'none', color: 'inherit' }}>
            <Container>
                <ShoppingBagIcon />
                {shoppingBagItems && shoppingBagItems.length > 0 && <ShoppingBagCount>{shoppingBagItems.length}</ShoppingBagCount>}
            </Container>
        </Link>

    )
}