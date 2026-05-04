import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* NAVBAR */}
      <div style={styles.navbar}>
        <h2 style={styles.logo}>EduGuide AI</h2>

        <div>
          <button style={styles.loginBtn} onClick={() => navigate("/login")}>
            Login
          </button>

          <button style={styles.signupBtn} onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </div>

      {/* HERO CONTENT */}
      <div style={styles.hero}>
        <h1 style={styles.title}>🎓 Welcome To Education Guide</h1>
        <p style={styles.subtitle}>
          AI Agent helping students choose the right path 🚀
        </p>

        <button style={styles.startBtn} onClick={() => navigate("/login")}>
          Get Started →
        </button>
      </div>
    </div>
  );
}

export default Home;

const styles = {
  container: {
    height: "100vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#fff",
    margin: "0"
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    background: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(10px)"
  },

  logo: {
    margin: 0
  },

  loginBtn: {
    padding: "8px 18px",
    marginRight: "10px",
    border: "1px solid #fff",
    background: "transparent",
    color: "#fff",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "0.3s"
  },

  signupBtn: {
    padding: "8px 18px",
    background: "#ff7a18",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s"
  },

  hero: {
    height: "calc(100vh - 70px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },

  title: {
    fontSize: "40px",
    marginBottom: "10px"
  },

  subtitle: {
    fontSize: "18px",
    marginBottom: "20px"
  },

  startBtn: {
    padding: "12px 25px",
    background: "#4facfe",
    border: "none",
    borderRadius: "25px",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s"
  }
};