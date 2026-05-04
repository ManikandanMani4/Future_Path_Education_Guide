import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Details from "./components/Details";
import Ambition from "./components/Ambition";
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/details" element={<Details />} />
        <Route path="/ambition" element={<Ambition />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;