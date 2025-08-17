import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useAuthContext } from "../components/AuthProvider";
import { AuthButtons } from "../components/AuthButtons";
import { getAuthHeaders } from "../utils/firebaseAuth";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { user, loading } = useAuthContext();

    // Redirect if user is already authenticated
    if (user && !loading) {
        navigate("/dashboard");
        return null;
    }

    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        
        if (!username || !password) {
            alert("Please enter both username and password");
            return;
        }

        try {
            // Get Firebase token for authentication
            const headers = await getAuthHeaders();
            if (!('Authorization' in headers)) {
                alert("Please sign in with Google or GitHub first to create an account");
                return;
            }

            await axios.post(BACKEND_URL + "/api/v1/signup", {
                username,
                password
            }, { headers });
            
            navigate("/signin");
            alert("You have signed up successfully!");
        } catch (error) {
            console.error("Signup failed:", error);
            alert("Signup failed. Please try again or sign in with Google/GitHub first.");
        }
    }

    return (
        <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
            <div className="p-8 bg-white rounded-2xl shadow-xl w-[400px]">
                <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
                
                {/* Firebase Auth Buttons */}
                <div className="mb-6">
                    <label className="text-sm text-gray-600 mb-3 block">Quick Sign Up</label>
                    <AuthButtons />
                </div>

                {/* Divider */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-gray-500">Or continue with</span>
                    </div>
                </div>

                {/* Traditional Username/Password Form */}
                <div className="space-y-4">
                    <Input placeholder={"Username"} reference={usernameRef} />
                    <Input placeholder={"Password"} reference={passwordRef} type="password" />
                    <div className="flex justify-center">
                        <Button
                            onClick={signup}
                            variant="primary"
                            text="Signup" />
                    </div>
                </div>

                <div className="text-center mt-4">
                    <span className="text-gray-600">Already have an account? </span>
                    <button 
                        onClick={() => navigate("/signin")}
                        className="text-blue-600 hover:underline"
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    );
}