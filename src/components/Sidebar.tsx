import { LogoIcon } from "../icons/LogoIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem, SidebarItem2 } from "./SidebarItem";

export function Sidebar() {
    return <div className="h-screen bg-white border-r border-purple-400 top-0 left-0 w-72 fixed">
        <div className = "pb-8 pl-2 text-2xl">
            <SidebarItem2 title = {"Brainly"} icon = {<LogoIcon />} />
        </div>
        <div className = "pl-2 space-y-4 cursor-pointer">
            <SidebarItem title={"X (Twitter)"} icon={<TwitterIcon />} />
            <SidebarItem title={"YouTube"} icon={<YoutubeIcon />} />
        </div>
    </div>
}