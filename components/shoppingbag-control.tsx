"use client"

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ShoppingBagIcon } from "./shoppingbag-icon";
import styled from "styled-components";


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
    const { value } = useLocalStorage('shoppingbag-items')
    console.log(value)




    return (
        <Container>
            <ShoppingBagIcon />
            {value.length && <ShoppingBagCount>{value.length}</ShoppingBagCount>}
        </Container>
    )
}