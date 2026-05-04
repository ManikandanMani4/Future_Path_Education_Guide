import { useLocation } from "react-router-dom";
import { useState } from "react";

function Dashboard() {
  const location = useLocation();

  const data =
    location.state || JSON.parse(localStorage.getItem("userData"));

  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openYear, setOpenYear] = useState(null);
  const [openPhase, setOpenPhase] = useState({});

  if (!data)
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>⚠ No Data Found</h2>
        <button onClick={() => (window.location.href = "/")}>
          Go to Login
        </button>
      </div>
    );

  const getRoadmap = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: data.name,
          ambition: data.ambition,
          years: data.years
        })
      });

      const text = await res.text();
      const json = JSON.parse(text); // ✅ convert to JSON

      setRoadmap(json);
    } catch (err) {
      console.error(err);
      setRoadmap(null);
    }

    setLoading(false);
  };

  const toggleYear = (year) => {
    setOpenYear(openYear === year ? null : year);
  };

  const togglePhase = (key) => {
    setOpenPhase((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          <h2>🎉 Welcome, {data.name}</h2>

          <div style={styles.infoBox}>
            <p><strong>Age:</strong> {data.age}</p>
            <p><strong>Gender:</strong> {data.gender}</p>
            <p><strong>Roll No:</strong> {data.roll}</p>
            <p><strong>Ambition:</strong> {data.ambition}</p>
            <p><strong>Years:</strong> {data.years}</p>
          </div>

          <button style={styles.button} onClick={getRoadmap}>
            🤖 Generate AI Roadmap
          </button>

          {loading && <p>⏳ Generating roadmap...</p>}

          {/* ✅ INTERACTIVE ROADMAP */}
          {roadmap && (
            <div style={styles.roadmapBox}>
              <h3>📘 Your AI Roadmap</h3>

              <h4>{roadmap.name} → {roadmap.role}</h4>

              {roadmap.years.map((year) => (
                <div key={year.year}>
                  {/* YEAR CLICK */}
                  <h3
                    onClick={() => toggleYear(year.year)}
                    style={{ cursor: "pointer", color: "#0077cc" }}
                  >
                    📅 Year {year.year}
                  </h3>

                  {openYear === year.year &&
                    year.phases.map((phase, index) => {
                      const key = `${year.year}-${index}`;

                      return (
                        <div key={index} style={styles.phaseCard}>
                          {/* PHASE CLICK */}
                          <h4
                            onClick={() => togglePhase(key)}
                            style={{ cursor: "pointer" }}
                          >
                            🔽 {phase.title} ({phase.months})
                          </h4>

                          {openPhase[key] && (
                            <>
                              <b>Topics:</b>
                              <ul>
                                {phase.topics.map((t, i) => (
                                  <li key={i}>{t}</li>
                                ))}
                              </ul>

                              <b>Projects:</b>
                              <ul>
                                {phase.projects.map((p, i) => (
                                  <li key={i}>{p}</li>
                                ))}
                              </ul>
                            </>
                          )}
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

const styles = {
  container: {
    height: "100vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1492724441997-5dc865305da7')",
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
    width: "500px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
  },
  infoBox: {
    textAlign: "left",
    marginTop: "20px",
    lineHeight: "1.8"
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    background: "#4facfe",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  roadmapBox: {
    marginTop: "20px",
    padding: "15px",
    background: "#f1f1f1",
    borderRadius: "10px",
    textAlign: "left",
    maxHeight: "350px",
    overflowY: "auto"
  },
  phaseCard: {
    border: "1px solid #ccc",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    background: "#fff"
  }
};