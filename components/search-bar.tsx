"use client"

import styled from "styled-components"
import { SearchIcon } from "./search-icon";
import { InputHTMLAttributes } from "react";

export const SearchBar = styled.input`
    width: 352px;
    padding: 10px 16px;
    border-radius: 8px;
    border: none;
    background-color: rgba(243, 245, 246, 1);
    font-family: inherit;
    font-weight: 400;
    line-height: 22px;
    font-size: 14px;
`;
const SearchBarContainer = styled.div`
    position: relative;
    width: 100%;
    svg {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
    }
`;

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {

}

export function SearchBarWIcon(props: SearchBarProps) {
    return (
        <SearchBarContainer>
            <SearchBar {...props}/>
            <SearchIcon/>
        </SearchBarContainer>
    )
}

