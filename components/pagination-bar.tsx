"use client"

import styled from "styled-components"
import { LeftArrowIcon } from "./icons/left-arrow-icon";
import { RightArrowIcon } from "./icons/right-arrow-icon";
import { useFilter } from "@/hooks/useFilter";

interface SelectedPageProps {
    selected: boolean;
}

const PaginationBarContainer = styled.div`
    width: 100%;
    display: flex;
    margin-top: 14px;
    justify-content: flex-end;
    padding: 0px 14vw;
    ul {
        display: flex;
        list-style-type: none;
        gap: 2px;
    }
`;
const PaginationItem = styled.li<SelectedPageProps>`
    cursor: pointer;
    display: flex;
    align-items: center; 
    justify-content: center; 
    background-color: ${props => props.selected ? 'transparent' : '#e9e9f0'};
    width: 32px;
    height: 32px;
    border-radius: 8px;
    font-weight: ${props => props.selected ? '600' : '400'};
    border: ${props => props.selected ? '1px solid rgba(255, 165, 133, 1)' : ''};
    color: ${props => props.selected ? 'rgba(255, 165, 133, 1)' : '#737380'};
    &:nth-last-child(2) {
        margin-left: 10px;
    }
`;


export function PaginationBar() {
    const { page, setPage, pages } = useFilter();

    const handleClick = (index: number) => {
        setPage(index);
        if(index != page) { window.scrollTo({ top: 0, behavior: 'smooth' });}
    };
    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    const handleNextPage = () => {
        if (page < pages) {
            setPage(page + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <PaginationBarContainer>
            <ul>
                {Array.from({ length: pages }, (_, index) => (
                    <PaginationItem key={index} selected={index + 1 === page} onClick={() => handleClick(index + 1)}>
                        {index + 1}
                    </PaginationItem>
                ))}
                <PaginationItem selected={false} onClick={handlePrevPage}><LeftArrowIcon/></PaginationItem>
                <PaginationItem selected={false} onClick={handleNextPage}><RightArrowIcon/></PaginationItem>
            </ul>
        </PaginationBarContainer>
    )
}

