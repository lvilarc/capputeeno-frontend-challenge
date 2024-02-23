"use client"

import { FilterType } from "@/types/filter-type";
import { PriorityType } from "@/types/priority-type";
import { useState, ReactNode, createContext } from "react";

export const FilterContext = createContext({
    search: '',
    page: 1,
    type: FilterType.ALL,
    priority: PriorityType.POPULARITY,
    pages: 1,
    setSearch: (value: string) => { },
    setPage: (value: number) => { },
    setType: (value: FilterType) => { },
    setPriority: (value: PriorityType) => { },
    setPages: (value: number) => { }
})

interface ProviderProps {
    children: ReactNode
}


export function FilterContextProvider({ children }: ProviderProps) {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [type, setType] = useState(FilterType.ALL);
    const [priority, setPriority] = useState(PriorityType.POPULARITY);
    const [pages, setPages] = useState(4);

    return (
        <FilterContext.Provider
            value={{
                search,
                page,
                type,
                priority,
                pages,
                setSearch,
                setPage,
                setType,
                setPriority,
                setPages
            }}>
            {children}
        </FilterContext.Provider>
    )
}