import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

export function CreateContentModal({ open, onClose }) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube)

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            link,
            title,
            type
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })

        onClose();
    }

    return <div>
        {open &&
            <div className="h-screen w-screen top-0 left-0 fixed bg-slate-500/60 flex justify-center items-center">
                <div className="bg-white p-4 rounded">
                    <div className="flex justify-end">
                        <div onClick={onClose} className="cursor-pointer">
                            <CrossIcon />
                        </div>
                    </div>
                    <div>
                        <Input reference={titleRef} placeholder={"Title"} />
                        <Input reference={linkRef} placeholder={"Link"} />
                    </div>
                    <div className="flex justify-center">
                        <Button
                            variant={type === ContentType.Youtube ? "primary" : "secondary"}
                            text="Youtube"
                            onClick={() => { setType(ContentType.Youtube) }}>
                        </Button>
                        <Button
                            variant={type === ContentType.Twitter ? "primary" : "secondary"}
                            text="Twitter"
                            onClick={() => { setType(ContentType.Twitter) }}>
                        </Button>
                    </div>
                    <div className="flex justify-center ">
                        <Button
                            variant="primary"
                            text="Submit"
                            onClick={addContent}>
                        </Button>
                    </div>
                </div>

            </div>}
    </div>
}