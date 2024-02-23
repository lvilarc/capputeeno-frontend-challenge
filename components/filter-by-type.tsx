"use client"

import { useFilter } from "@/hooks/useFilter"
import { FilterType } from "@/types/filter-type"
import styled from "styled-components"


interface FilterItemProps {
    selected: boolean
}


const TypeList = styled.ul`
    display: flex;
    align-itens: center;
    justify-content: center;
    gap: 30px;
    list-style-type: none;
`;
const ListItem = styled.li<FilterItemProps>`
    font-family: inherit;
    font-size: 18px;
    font-weight: ${props => props.selected ? '600' : '400'};
    text-transform: uppercase;
    color: ${props => props.selected ? '#41414d' : '#737380'};
    border-bottom: ${props => props.selected ? '4px solid rgba(255, 165, 133, 1)' : ''};
    cursor: pointer;
`;

export function FilterByType() {
    const { type, setType } = useFilter();

    const handleChangeType = (value: FilterType) => {
        setType(value);
    }
    return (
        <div>
            <TypeList>

                <ListItem
                    selected={type === FilterType.ALL}
                    onClick={() => handleChangeType(FilterType.ALL)}
                >
                    Todos os produtos
                </ListItem>

                <ListItem
                    selected={type === FilterType.SHIRT}
                    onClick={() => handleChangeType(FilterType.SHIRT)}>
                    Camisetas
                </ListItem>

                <ListItem
                    selected={type === FilterType.MUG}
                    onClick={() => handleChangeType(FilterType.MUG)}>
                    Canecas
                </ListItem>

            </TypeList>

        </div>
    )
}

