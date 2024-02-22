import { useState } from "react";

export function useLocalStorage<T>(item: string) {
    // const [value, setValue] = useState(JSON.parse(localStorage.getItem(item) ?? ''));
    const [value, setValue] = useState(["1", "2"])

    const updateLocalStorage = (newValue: T) => {
        setValue(newValue);
        localStorage.setItem(item, JSON.stringify(newValue))
    }

    return {
        value,
        updateLocalStorage
    }
}