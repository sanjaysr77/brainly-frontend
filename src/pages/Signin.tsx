import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

// Starts here
export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  async function signin() {
    const username = usernameRef.current?.value
    const password = passwordRef.current?.value

    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username,
      password,
    })

    const jwt = response.data.token
    localStorage.setItem("token", jwt)
    navigate("/dashboard")
  }

  return (
    <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-[350px] shadow-2xl">
        <CardHeader>
          <CardTitle className="text-center">Sign in to your account</CardTitle>
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
  )
}
// Ends here
