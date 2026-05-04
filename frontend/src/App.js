import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages / Components
import Login from "./components/Login";
import Details from "./components/Details";
import Ambition from "./components/Ambition";
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🏠 Home Page */}
        <Route path="/" element={<Home />} />

        {/* 🔐 Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🧾 User Input Flow */}
        <Route path="/details" element={<Details />} />
        <Route path="/ambition" element={<Ambition />} />

        {/* 📊 Final Output Page */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* ❌ Optional fallback */}
        <Route path="*" element={<h2>Page Not Found</h2>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;