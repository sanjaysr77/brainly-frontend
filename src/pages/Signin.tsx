import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  async function signin() {
    const username = usernameRef.current?.value
    const password = passwordRef.current?.value

    if (!username || !password) {
      alert("Please enter both username and password")
      return
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password,
      })

      const jwt = response.data.token
      localStorage.setItem("token", jwt)
      navigate("/dashboard")
    } catch (err) {
      console.error("Signin failed", err)
      alert("Signin failed. Please check your credentials.")
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
        <Card className="w-[350px] shadow-2xl">
          <CardHeader>
            <CardTitle className="text-blue-300 text-xl text-center">
              Welcome Back to Brainly AI
            </CardTitle>
            <CardTitle className="text-center">
              Sign in to your account
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
