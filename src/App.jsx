import Navbar from "./layout/Navbar";
import Home from "../src/pages/Home";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  

  return (
    <div>
      <Navbar />
       <Router> 
         <Routes>
           <Route path="/navbar" element={<Navbar />} /> 
           <Route path="/" element={<Home />} />
           <Route path="/home" element={<Home />} />
         </Routes>
       </Router>
    </div>
  )
}

export default App
