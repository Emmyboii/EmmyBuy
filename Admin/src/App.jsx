import Admin from "../Pages/Admin"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import { Routes, Route } from 'react-router-dom'


function App() {

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Admin />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
