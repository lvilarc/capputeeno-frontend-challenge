"use client"

import styled from "styled-components"
import { Saira_Stencil_One } from "next/font/google";
import { SearchBarWIcon } from "./search-bar";
import { ShoppingBagControl } from "./shoppingbag-control";



const sairaStencil = Saira_Stencil_One({
    weight: ['400'],
    subsets: ["latin"]
});

const TagHeader = styled.header`
    display: flex;
    align-items: center;
    padding: 10px 4vw;
    background-color: rgba(255, 255, 255, 1);
    justify-content: space-between;
    div {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 22px;
    }
    
`;



const Logo = styled.a`
    cursor: pointer;
    color: rgba(93, 93, 109, 1);
    font-weight: 400;
    font-size: 40px;
    @media (max-width: 706px) {
        font-size: 34px;
    }
`;

export function Header() {
    
    return (
        <TagHeader>
                <Logo className={sairaStencil.className}>capputeeno</Logo>
            <div>
                <SearchBarWIcon placeholder="Procurando por algo específico?"></SearchBarWIcon>
                <ShoppingBagControl/>
            </div>
        </TagHeader>
    )
}


