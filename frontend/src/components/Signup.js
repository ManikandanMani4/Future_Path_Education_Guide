import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first: "",
    last: "",
    age: "",
    password: "",
    confirm: ""
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();

    if (
      !form.first ||
      !form.last ||
      !form.age ||
      !form.password ||
      !form.confirm
    ) {
      alert("⚠ Fill all fields");
      return;
    }

    if (form.password !== form.confirm) {
      alert("⚠ Passwords do not match");
      return;
    }

    // 🔥 STORE USER (temporary)
    localStorage.setItem(
      "user",
      JSON.stringify({
        username: form.first,
        password: form.password
      })
    );

    alert("Signup successful 🚀");

    navigate("/details", { state: form });
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <form style={styles.card} onSubmit={handleSignup}>
          <h2>📝 Create Account</h2>

          <input
            name="username"
            autoComplete="username"
            placeholder="First Name"
            style={styles.input}
            onChange={(e) =>
              setForm({ ...form, first: e.target.value })
            }
          />

          <input
            placeholder="Last Name"
            style={styles.input}
            onChange={(e) =>
              setForm({ ...form, last: e.target.value })
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

          {/* Password */}
          <div style={styles.passwordBox}>
            <input
              name="password"
              autoComplete="new-password"
              type={showPass ? "text" : "password"}
              placeholder="Password"
              style={styles.passwordInput}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
            <span onClick={() => setShowPass(!showPass)}>
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Confirm Password */}
          <div style={styles.passwordBox}>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              style={styles.passwordInput}
              onChange={(e) =>
                setForm({ ...form, confirm: e.target.value })
              }
            />
            <span onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" style={styles.signupBtn}>
            Sign Up
          </button>

          <p style={styles.loginText}>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} style={styles.link}>
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;

const styles = {
  container: {
    height: "100vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f')",
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
    width: "330px",
    textAlign: "center"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },
  passwordBox: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "8px",
    margin: "8px 0",
    padding: "0 10px"
  },
  passwordInput: {
    flex: 1,
    padding: "10px",
    border: "none",
    outline: "none"
  },
  signupBtn: {
    width: "100%",
    padding: "10px",
    background: "#ff7a18",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },
  loginText: { marginTop: "15px" },
  link: { color: "#3498db", cursor: "pointer", fontWeight: "bold" }
};