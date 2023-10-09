import "./App.css";
import {Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/common/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import OpenRoute from "./components/core/auth/OpenRoute";
function App() {
  return (
   <div className="w-screen min-h-screen bg-richblack-900 flex-col font-inter">
    <Navbar/>
    <Routes>
      <Route path="/" element={
      <OpenRoute>
        <Home/>
      </OpenRoute> 
      }/>
      <Route path="/signup" element={
      <OpenRoute>
        <Signup/>
      </OpenRoute>
      }/>
      <Route path="/login" element={<OpenRoute><Login/></OpenRoute>}/>
      <Route path="/forgot-password" element={<OpenRoute><ForgotPassword/></OpenRoute>}/>
    </Routes>
   </div>
  ); 
}

export default App;
