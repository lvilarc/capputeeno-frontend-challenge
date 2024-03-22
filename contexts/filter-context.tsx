"use client"

import { FilterType } from "@/types/filter-type";
import { PriorityType } from "@/types/priority-type";
import { useState, ReactNode, createContext } from "react";
import { CartItem } from "@/types/cart-item";

export const FilterContext = createContext({
    search: '',
    page: 1,
    type: FilterType.ALL,
    priority: PriorityType.NONE,
    pages: 1,
    shoppingBagItems: [] as CartItem[],
    setSearch: (value: string) => { },
    setPage: (value: number) => { },
    setType: (value: FilterType) => { },
    setPriority: (value: PriorityType) => { },
    setPages: (value: number) => { },
    setShoppingBagItems: (value: CartItem[]) => { }
})

interface ProviderProps {
    children: ReactNode
}


export function FilterContextProvider({ children }: ProviderProps) {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [type, setType] = useState(FilterType.ALL);
    const [priority, setPriority] = useState(PriorityType.NONE);
    const [pages, setPages] = useState(1);
    const [shoppingBagItems, setShoppingBagItems] = useState<CartItem[]>([]);

    

   

    return (
        <FilterContext.Provider
            value={{
                search,
                page,
                type,
                priority,
                pages,
                shoppingBagItems,
                setSearch,
                setPage,
                setType,
                setPriority,
                setPages,
                setShoppingBagItems
            }}>
            {children}
        </FilterContext.Provider>
    )
}