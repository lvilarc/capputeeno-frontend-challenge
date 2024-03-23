"use client"

import styled from "styled-components"
import { SearchIcon } from "./icons/search-icon";
import { InputHTMLAttributes } from "react";
import { useFilter } from "@/hooks/useFilter";

const Input = styled.input`
    width: 352px;
    padding: 10px 16px;
    border-radius: 8px;
    border: none;
    background-color: rgba(243, 245, 246, 1);
    font-family: inherit;
    font-weight: 400;
    line-height: 22px;
    font-size: 14px;
    outline: none; /* Remove o destaque padrão quando focado */
    transition: box-shadow 0.3s ease; /* Adiciona uma transição suave */
    
    &:focus {
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2); /* Adiciona uma borda quando focado */
    }

    @media (max-width: 706px) {
        width: 300px;
    }
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
    const {search, setSearch} = useFilter();
    return (
        <SearchBarContainer>
            <Input
                onChange={(event) => setSearch(event.target.value)}
                value={search}
                {...props} />
            <SearchIcon />
        </SearchBarContainer>
    )
}

