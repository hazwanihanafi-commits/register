import { Link } from "react-router-dom";

export default function MainLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "250px",
          background: "#4B0082",
          color: "white",
          padding: "20px",
        }}
      >
        <h2>USM Register</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "30px" }}>
          <Link style={linkStyle} to="/">Dashboard</Link>
          <Link style={linkStyle} to="/participants">Participants</Link>
          <Link style={linkStyle} to="/scanner">Scanner</Link>
          <Link style={linkStyle} to="/reports">Reports</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "30px", background: "#f5f5f5" }}>
        {children}
      </main>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  padding: "10px",
  borderRadius: "6px",
  background: "#673AB7",
};
