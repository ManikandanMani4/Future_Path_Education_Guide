import { useNavigate } from "react-router-dom";
import { useState } from "react";

// 🔵 Google Auth (optional – works if firebase setup done)
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔐 Email Login
  const handleLogin = () => {
    if (!email || !password) {
      alert("⚠ Please enter email and password");
      return;
    }

    // 👉 backend validation here (future)
    navigate("/details");
  };

  // 🔵 Google Login
  const handleGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);

      // 👉 send to backend if needed
      navigate("/details");
    } catch {
      alert("Google login failed");
    }
  };

  // 👤 Guest Login (NO AUTH)
  const handleGuest = () => {
    navigate("/details");
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          <h2>🔐 Login</h2>

          <input
            placeholder="Email"
            style={styles.input}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={styles.loginBtn} onClick={handleLogin}>
            Login
          </button>

          <p style={styles.or}>OR</p>

          <button style={styles.googleBtn} onClick={handleGoogle}>
            Continue with Google
          </button>

          <button style={styles.guestBtn} onClick={handleGuest}>
            Continue as Guest
          </button>

          <p style={styles.signupText}>
            New user?{" "}
            <span onClick={() => navigate("/signup")} style={styles.link}>
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

const styles = {
  container: {
    height: "100vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644')",
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
    borderRadius: "12px",
    width: "320px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },

  loginBtn: {
    width: "100%",
    padding: "10px",
    background: "#4facfe",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  googleBtn: {
    width: "100%",
    padding: "10px",
    background: "#db4437",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    marginTop: "10px",
    cursor: "pointer"
  },

  guestBtn: {
    width: "100%",
    padding: "10px",
    background: "#2ecc71",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    marginTop: "10px",
    cursor: "pointer"
  },

  or: {
    margin: "10px 0",
    color: "#777"
  },

  signupText: {
    marginTop: "15px"
  },

  link: {
    color: "#3498db",
    cursor: "pointer",
    fontWeight: "bold"
  }
};