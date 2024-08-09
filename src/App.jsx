import Navbar from "./layout/Navbar"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  

  return (
    <div>
       <Router> 
         <Routes>
           <Route path="/navbar" element={<Navbar />} /> 
         </Routes>
       </Router>
    </div>
  )
}

export default App
