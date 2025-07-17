import { DeleteIcon } from "../icons/DeleteIcon";
import { LinkIcon } from "../icons/LinkIcon";

interface CardProps {
    type: "youtube" | "twitter";
    link: string;
    title: string;
    contentId: string;
    onDelete?: (contentId: string) => void;
}

export function Card({ type, link, title, contentId, onDelete }: CardProps) {
    return (
        <div>
            <div className="p-4 bg-gray-300 rounded-md border-red-700 max-w-72 border min-h-48 min-w-72">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <a href={link} target="_blank" rel="noopener noreferrer">
                            <LinkIcon />
                        </a>
                        <div className="truncate max-w-[150px]">{title}</div>
                    </div>
                    <div
                        className="cursor-pointer"
                        onClick={() => onDelete?.(contentId)}
                    >
                        <DeleteIcon />
                    </div>
                </div>

                {/* Bottom Content */}
                <div className="pt-4">
                    {type === "youtube" && (
                        <iframe
                            className="w-full"
                            src={`https://www.youtube.com/embed/${new URL(link).searchParams.get("v")}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    )}

                    {type === "twitter" && (
                        <blockquote className="twitter-tweet">
                            <a href={link.replace("x.com", "twitter.com")}></a>
                        </blockquote>
                    )}
                </div>
            </div>
        </div>
    );
}
