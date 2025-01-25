import { BrowserRouter,Route,Routes } from "react-router-dom"
import Home from "./pages/Home"
import { Navbar } from "./components/Navbar"
import Signin from "./pages/Signin"


export default function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  )
}
