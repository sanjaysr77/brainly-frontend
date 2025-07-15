import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate();

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
            username,
            password
        });

        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        navigate("/dashboard")
    }
    return <div className="h-screen w-screen bg-gray-100 flex justify-center items-center ">
        <div className="p-8 bg-white rounded-2xl shadow-xl">
            <Input placeholder={"Username"}
                reference={usernameRef} />
            <Input placeholder={"Password"}
                reference={passwordRef} type="password" />
            <div className="flex justify-center">
                <Button
                    onClick={signin}
                    variant="primary"
                    text="Signin" />
            </div>
        </div>
    </div>
}