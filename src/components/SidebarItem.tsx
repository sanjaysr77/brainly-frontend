import { ReactElement } from "react";

interface SidebarItemProps {
    title: string;
    icon: ReactElement
}
export function SidebarItem ({title, icon}: SidebarItemProps) {
    return <div className = "flex items-center hover:bg-gray-200 rounded-md max-w-48 min-h-12 overflow-hidden">
        {icon}
        {<div className = "pl-2">{title}</div>}
    </div>
}

export function SidebarItem2 ({title, icon}: SidebarItemProps) {
    return <div className = "flex items-center">
        {icon}
        {<div className = "pl-2">{title}</div>}
    </div>
}