// Try to understand how to place an React Element inside an input box

import { useRef, type ReactElement } from "react";

interface SearchBarProps {
    placeholder: string;
    startIcon?: ReactElement;
    onSearch: (query: string) => void;
}

export function SearchBar({ placeholder, startIcon, onSearch }: SearchBarProps) {

    const inputRef = useRef<HTMLInputElement>(null);

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {

        if(event.key === "Enter" && inputRef.current) {
            const query = inputRef.current.value.trim();
            console.log(query)
            if (query !== "") {
                onSearch(query);
                inputRef.current.value = "";
            }
        }
    }
    return (
        <div className="relative mt-4 w-[400px]">
            {/* Icon positioned inside the input */}
            {startIcon && (
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    {startIcon}
                </div>
            )}
            <input
                ref = {inputRef}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="bg-gray-200 w-full h-12 pl-10 pr-4 text-base border border-red-700 rounded-3xl outline-none"
            />
        </div>
    );
}
