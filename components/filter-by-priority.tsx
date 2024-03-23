"use client"

import { useFilter } from "@/hooks/useFilter";
import { useEffect, useState } from "react"
import styled from "styled-components"
import { ArrowIcon } from "./icons/arrow-icon";
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
    const { setPriority, setPage, priority } = useFilter();
    const [filterLabel, setFilterLabel] = useState('');

    useEffect(()=> {
        if (priority === PriorityType.NONE) {
            setFilterLabel("Organizar por")
        }
        if (priority === PriorityType.BIGGEST_PRICE) {
            setFilterLabel("Preço: Maior - menor")
        }
        if (priority === PriorityType.MINOR_PRICE) {
            setFilterLabel("Preço: Menor - maior")
        }
        if (priority === PriorityType.NEWS) {
            setFilterLabel("Novidades")
        }
        if (priority === PriorityType.POPULARITY) {
            setFilterLabel("Mais vendidos")
        }
    },[]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!event.target || !(event.target instanceof Element)) return;

            if (!event.target.closest('.priority-filter-button')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleOpen = () => { setIsOpen(prevState => !prevState) };

    const handlePriority = (value: PriorityType, text: string) => {
        setPriority(value);
        setIsOpen(false);
        setFilterLabel(text);
        setPage(1);
    }

    return (
        <FilterContainer>
            <button className="priority-filter-button" onClick={handleOpen}>
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