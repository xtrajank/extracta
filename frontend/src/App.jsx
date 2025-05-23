import { BrowserRouter, Routes, Route} from "react-router-dom";
import { useState} from 'react'
import './App.css'
import Home from "./pages/Home";
import Columns from "./pages/Columns";
import Data from "./pages/Data";

function App() {
  const BASE_URL = "http://localhost:5173"
  const [sessionId, setSessionId] = useState(null);

  return (
    <>
      <h2 className="goback"><a href={`${BASE_URL}/`}>extracta</a></h2>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home setSessionId={setSessionId}/>} />
          <Route path="/columns" element={<Columns sessionId={sessionId}/>} />
          <Route path="/data" element={<Data sessionId={sessionId}/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
