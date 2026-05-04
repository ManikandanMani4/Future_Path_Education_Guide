import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Ambition() {
  const navigate = useNavigate();
  const location = useLocation();

  const userData = location.state || {};

  const [ambition, setAmbition] = useState("");
  const [years, setYears] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!ambition || !years) {
      alert("⚠ Please select ambition and years");
      return;
    }

    if (years <= 0) {
      alert("⚠ Years must be greater than 0");
      return;
    }

    setLoading(true);

    // simulate small delay (better UX)
    setTimeout(() => {
      navigate("/dashboard", {
        state: { ...userData, ambition, years }
      });
    }, 500);
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          <h2>🎯 Choose Your Ambition</h2>

          {/* 👤 Show user name if available */}
          {userData.name && (
            <p style={{ color: "#555" }}>
              Welcome, <b>{userData.name}</b>
            </p>
          )}

          {/* 🎯 Ambition Dropdown */}
          <select
            style={styles.input}
            value={ambition}
            onChange={(e) => setAmbition(e.target.value)}
          >
            <option value="">Select Ambition</option>
            <option>AI Engineer</option>
            <option>Cloud Architect</option>
            <option>Data Scientist</option>
            <option>Full Stack Developer</option>
            <option>Entrepreneur</option>
          </select>

          {/* ⏳ Years Input */}
          <input
            type="number"
            placeholder="Years to achieve"
            style={styles.input}
            value={years}
            min="1"
            onChange={(e) => setYears(e.target.value)}
          />

          {/* 🚀 Button */}
          <button
            style={{
              ...styles.button,
              background: loading ? "#aaa" : "#ff7a18",
              cursor: loading ? "not-allowed" : "pointer"
            }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Generating..." : "Continue →"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Ambition;

const styles = {
  container: {
    height: "100vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d')",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },

  overlay: {
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "15px",
    width: "340px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
  },

  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px"
  },

  button: {
    width: "100%",
    padding: "12px",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    marginTop: "10px",
    transition: "0.3s"
  }
};