import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Details() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    roll: ""
  });

  const handleNext = () => {
    if (!form.name || !form.age || !form.gender || !form.roll) {
      alert("⚠ Please fill all fields");
      return;
    }

    navigate("/ambition", { state: form });
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          <h2>📋 Enter Your Details</h2>

          <input
            placeholder="Full Name"
            style={styles.input}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Age"
            style={styles.input}
            onChange={(e) =>
              setForm({ ...form, age: e.target.value })
            }
          />

          <select
            style={styles.input}
            onChange={(e) =>
              setForm({ ...form, gender: e.target.value })
            }
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            placeholder="Roll Number"
            style={styles.input}
            onChange={(e) =>
              setForm({ ...form, roll: e.target.value })
            }
          />

          <button style={styles.button} onClick={handleNext}>
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Details;

const styles = {
  container: {
    height: "100vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085')",
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
    background: "#4facfe",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px"
  }
};