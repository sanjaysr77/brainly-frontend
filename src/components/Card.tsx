import { ShareIcon } from "../icons/ShareIcon";


interface CardProps {
    type: "youtube" | "twitter";
    link: string;
    title: string;
}

export function Card({ type, link, title }: CardProps) {
    return <div>
        <div className="p-4 bg-gray-300 rounded-md border-red-700 max-w-72 border min-h-48 min-w-72 ">
            <div className="flex items-center">
                <a href={link} target="_blank" rel="noopener noreferrer" className="pr-2">
                    <ShareIcon />
                </a>
                {title}
            </div>
            <div className="pt-4">
                {type === "youtube" && <iframe className="w-full" src={`https://www.youtube.com/embed/${new URL(link).searchParams.get("v")}`}
                    title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                {type === "twitter" && <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com", "twitter.com")}></a>
                </blockquote>}
            </div>
        </div>
    </div>
}