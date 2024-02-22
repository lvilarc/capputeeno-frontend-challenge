"use client"

import { useFilter } from "@/hooks/useFilter";
import { useState } from "react"
import styled from "styled-components"
import { ArrowIcon } from "./arrow-icon";
import { PriorityType } from "@/types/priority-type";






const FilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: relative;
    button {
        border: none;
        font-family: inherit;
        background: transparent;
        cursor: pointer;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #737380;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px;
        svg {
            margin-left: 10px;
        }
    }
`;
const PriorityFilter = styled.ul`
    white-space: nowrap;
    margin-top: 40px;
    position: absolute;
    list-style-type: none;
    background-color: white;
    padding: 15px;
    border-radius: 6px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    li {
        color: #737380;
        font-size: 14px;
        cursor: pointer;
    }
    li + li {
        margin-top: 8px;
    }
`;



export function FilterByPriority() {
    const [isOpen, setIsOpen] = useState(false);
    const { setPriority } = useFilter();

    const handleOpen = () => setIsOpen(prevState => !prevState);

    const [filterLabel, setFilterLabel] = useState("Organizar por")

    const handlePriority = (value: PriorityType, text: string) => {
        setPriority(value);
        setIsOpen(false);
        setFilterLabel(text);
    }


    return (
        <FilterContainer>
            <button onClick={handleOpen}>
                {filterLabel}
                <ArrowIcon />
            </button>
            {isOpen &&
                <PriorityFilter>
                    <li
                        onClick={() => handlePriority(PriorityType.NEWS, "Novidades")}
                    >
                        Novidades
                    </li>

                    <li
                        onClick={() => handlePriority(PriorityType.BIGGEST_PRICE, "Preço: Maior - menor")}
                    >
                        Preço: Maior - menor
                    </li>

                    <li
                        onClick={() => handlePriority(PriorityType.MINOR_PRICE, "Preço: Menor - maior")}
                    >
                        Preço: Menor - maior
                    </li>

                    <li
                        onClick={() => handlePriority(PriorityType.POPULARITY, "Mais vendidos")}
                    >
                        Mais vendidos
                    </li>
                </PriorityFilter>
            }
        </FilterContainer>

    )
}