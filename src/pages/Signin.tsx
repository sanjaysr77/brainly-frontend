import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useAuthContext } from "../components/AuthProvider"
import { AuthButtons } from "../components/AuthButtons"
import { getAuthHeaders } from "../utils/firebaseAuth"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { user, loading } = useAuthContext()

  // Redirect if user is already authenticated
  if (user && !loading) {
    navigate("/dashboard")
    return null
  }

  async function signin() {
    const username = usernameRef.current?.value
    const password = passwordRef.current?.value

    if (!username || !password) {
      alert("Please enter both username and password")
      return
    }

    try {
      // Get Firebase token for authentication
      const headers = await getAuthHeaders();
      if (!('Authorization' in headers)) {
        alert("Please sign in with Google or GitHub first to use traditional login");
        return;
      }

      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password,
      }, { headers })

      // Store the backend token if needed for backward compatibility
      if (response.data.token) {
        localStorage.setItem("token", response.data.token)
      }
      
      navigate("/dashboard")
    } catch (err) {
      console.error("Signin failed", err)
      alert("Signin failed. Please check your credentials or sign in with Google/GitHub first.")
    }
  }

  return (
    <div className="h-screen w-screen relative flex justify-center items-center overflow-hidden">
      {/* Radial Gradient Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
        }}
      />

      {/* Signin Card */}
      <div className="relative z-10">
        <Card className="w-[400px] shadow-2xl">
          <CardHeader>
            <CardTitle className="text-blue-300 text-xl text-center">
              Welcome Back to Brainly AI
            </CardTitle>
            <CardTitle className="text-center">
              Sign in to your account
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Firebase Auth Buttons */}
            <div>
              <Label className="text-sm text-gray-600 mb-3 block">Quick Sign In</Label>
              <AuthButtons />
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Traditional Username/Password Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  ref={usernameRef}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  ref={passwordRef}
                />
              </div>

              <Button className="w-full" onClick={signin}>
                Sign In
              </Button>
            </div>

            <div className="text-center">
              <span className="text-gray-600">Don't have an account? </span>
              <button 
                onClick={() => navigate("/signup")}
                className="text-blue-600 hover:underline"
              >
                Sign up
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
