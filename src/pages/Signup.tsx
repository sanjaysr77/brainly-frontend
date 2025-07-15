import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Signup() {

    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signup () {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        await axios.post (BACKEND_URL + "/api/v1/signup" , {
            username,
            password
        })
        navigate("/signin");
        alert("You have signed up");

    }
    return <div className="h-screen w-screen bg-gray-100 flex justify-center items-center ">
        <div className="p-8 bg-white rounded-2xl shadow-xl">
            <Input placeholder={"Username"} reference={usernameRef} />
            <Input placeholder={"Password"} reference={passwordRef}type="password" />
            <div className = "flex justify-center">
                <Button
                    onClick={signup}
                    variant="primary"
                    text="Signup" />
            </div>
        </div>
    </div>
}