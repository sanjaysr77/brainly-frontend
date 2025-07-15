
import Dashboard from "./pages/dashboard";
import { Signin } from "./pages/signin";
import { Signup } from "./pages/Signup";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App () {
  return <div>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Navigate to = "/signin" /> } />
        <Route path = "/signup" element = {<Signup />} />
        <Route path = "/signin" element = {<Signin />} />
        <Route path = "/dashboard" element = {<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </div>
}
export default App; 