
import Dashboard from "./pages/Dashboard";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserSearch } from "./pages/UserSearch";

function App () {
  return <div>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Navigate to = "/signin" /> } />
        <Route path = "/signup" element = {<Signup />} />
        <Route path = "/signin" element = {<Signin />} />
        <Route path = "/dashboard" element = {<Dashboard />} />
        <Route path = "/usersearch" element = {<UserSearch />} />
      </Routes>
    </BrowserRouter>
  </div>
}
export default App; 