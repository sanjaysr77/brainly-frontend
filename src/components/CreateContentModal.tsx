import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";

export function CreateContentModal({ open, onClose }) {
    return <div>
        {open &&
            <div className="h-screen w-screen top-0 left-0 fixed bg-slate-500/60 flex justify-center items-center">
                <div className="bg-white p-4 rounded">
                    <div className="flex justify-end">
                        <div onClick = {onClose} className = "cursor-pointer">
                            <CrossIcon />
                        </div>
                    </div>
                    <div>
                        <Input placeholder={"Title"} />
                        <Input placeholder={"Link"} />
                    </div>
                    <div className="flex justify-center">
                        <Button
                            variant="secondary"
                            text="Youtube">
                        </Button>
                        <Button
                            variant="secondary"
                            text="Twitter">
                        </Button>
                    </div>
                    <div className = "flex justify-center ">
                        <Button
                            variant="primary"
                            text="Submit">
                        </Button>
                    </div>
                </div>

            </div>}
    </div>
}