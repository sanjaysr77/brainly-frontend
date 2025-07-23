// Try to understand how to place an React Element inside an input box

import type { ReactElement } from "react";

interface SearchBarProps {
    placeholder: string;
    startIcon?: ReactElement;
}

export function SearchBar({ placeholder, startIcon }: SearchBarProps) {
    return (
        <div className="relative mt-4 w-[400px]">
            {/* Icon positioned inside the input */}
            {startIcon && (
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    {startIcon}
                </div>
            )}
            <input
                placeholder={placeholder}
                className="bg-gray-200 w-full h-12 pl-10 pr-4 text-base border border-red-700 rounded-3xl outline-none"
            />
        </div>
    );
}
