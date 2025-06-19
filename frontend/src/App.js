import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ChatAssistant from "./components/ChatAssistant";
import ViewReports from "./components/ViewReports";

function App() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const theme = dark ? "darkly" : "flatly";
    const existingLink = document.getElementById("bootswatch-theme");

    if (existingLink) {
      existingLink.href = `https://cdn.jsdelivr.net/npm/bootswatch@5.3.3/dist/${theme}/bootstrap.min.css`;
    } else {
      const link = document.createElement("link");
      link.id = "bootswatch-theme";
      link.rel = "stylesheet";
      link.href = `https://cdn.jsdelivr.net/npm/bootswatch@5.3.3/dist/${theme}/bootstrap.min.css`;
      document.head.appendChild(link);
    }

    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <Router>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>FixMyHood</h2>
          <button
            className="btn btn-outline-light"
            onClick={() => setDark(prev => !prev)}
          >
            {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <nav className="mb-4">
          <Link to="/" className="btn btn-primary me-2">Report Issue</Link>
          <Link to="/reports" className="btn btn-secondary">View Reports</Link>
        </nav>

        <Routes>
          <Route path="/" element={<ChatAssistant />} />
          <Route path="/reports" element={<ViewReports />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
