"use client"

import styled from "styled-components";
import { FilterByPriority } from "./filter-by-priority";
import { FilterByType } from "./filter-by-type";


const FilterBarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0px 14vw;
    white-space: nowrap;
`;

export function FilterBar() {
    return (
        <FilterBarContainer>
            <FilterByType></FilterByType>
            <FilterByPriority></FilterByPriority>
        </FilterBarContainer>
    )

}

