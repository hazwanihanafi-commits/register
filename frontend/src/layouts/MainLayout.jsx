import { Link, useLocation } from "react-router-dom";

export default function MainLayout({ children }) {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/" },
    { name: "Participants", path: "/participants" },
    { name: "Scanner", path: "/scanner" },
    { name: "Reports", path: "/reports" },
  ];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f5f7fb",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          background: "#4B0082",
          color: "white",
          padding: "25px",
        }}
      >
        <h2 style={{ marginBottom: "40px" }}>🎓 USM Register</h2>

        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: "block",
              textDecoration: "none",
              color: "white",
              padding: "14px",
              borderRadius: "10px",
              marginBottom: "10px",
              background:
                location.pathname === item.path
                  ? "rgba(255,255,255,0.2)"
                  : "transparent",
            }}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Main */}
      <div style={{ flex: 1 }}>

        {/* Top Bar */}
        <div
          style={{
            height: "70px",
            background: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 30px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <input
            placeholder="Search participant..."
            style={{
              width: "350px",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #ddd",
            }}
          />

          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
            }}
          >
            🔔
            <div
              style={{
                background: "#4B0082",
                color: "white",
                padding: "10px 16px",
                borderRadius: "30px",
              }}
            >
              Admin
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "30px" }}>
          {children}
        </div>

      </div>
    </div>
  );
}
