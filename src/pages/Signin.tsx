import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function Signin() {
    return <div className="h-screen w-screen bg-gray-100 flex justify-center items-center ">
        <div className="p-8 bg-white rounded-2xl shadow-xl">
            <Input placeholder={"Username"} />
            <Input placeholder={"Password"} type="password" />
            <div className = "flex justify-center">
                <Button
                    variant="primary"
                    text="Signin" />
            </div>
        </div>
    </div>
}