import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  QrCode,
  BarChart3,
  Bell,
  Search,
  UserCircle,
} from "lucide-react";

export default function MainLayout() {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Participants",
      path: "/participants",
      icon: <Users size={20} />,
    },
    {
      name: "Scanner",
      path: "/scanner",
      icon: <QrCode size={20} />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <BarChart3 size={20} />,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F5F7FB",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* ================= Sidebar ================= */}

      <aside
        style={{
          width: 260,
          background: "linear-gradient(180deg,#4B0082,#6D28D9)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          padding: 25,
          boxShadow: "5px 0 25px rgba(0,0,0,.15)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontSize: 55,
            }}
          >
            🎓
          </div>

          <h2
            style={{
              margin: 0,
              fontWeight: 700,
            }}
          >
            USM Register
          </h2>

          <p
            style={{
              opacity: 0.8,
              fontSize: 13,
              marginTop: 8,
            }}
          >
            Participant Registration System
          </p>
        </div>

        {menu.map((item) => {
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                textDecoration: "none",
                color: "#fff",
                padding: "14px 18px",
                marginBottom: 12,
                borderRadius: 14,
                transition: "all .3s ease",
                background: active
                  ? "rgba(255,255,255,.22)"
                  : "transparent",
                fontWeight: active ? 600 : 400,
              }}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}

        <div style={{ flex: 1 }} />

        <div
          style={{
            background: "rgba(255,255,255,.12)",
            borderRadius: 15,
            padding: 15,
            marginBottom: 20,
          }}
        >
          <div style={{ fontWeight: 600 }}>
            Participant System
          </div>

          <div
            style={{
              fontSize: 13,
              opacity: 0.8,
              marginTop: 5,
            }}
          >
            Version 1.0.0
          </div>
        </div>
      </aside>

      {/* ================= Main ================= */}

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ================= Top Bar ================= */}

        <header
          style={{
            height: 75,
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 35px",
            boxShadow: "0 5px 20px rgba(0,0,0,.05)",
          }}
        >
          {/* Search */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#F3F4F6",
              borderRadius: 40,
              padding: "10px 18px",
              width: 420,
            }}
          >
            <Search size={18} color="#777" />

            <input
              placeholder="Search participant..."
              style={{
                marginLeft: 10,
                width: "100%",
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: 15,
              }}
            />
          </div>

          {/* Right */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 25,
            }}
          >
            <Bell
              size={22}
              style={{ cursor: "pointer" }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <UserCircle
                size={42}
                color="#4B0082"
              />

              <div>
                <div
                  style={{
                    fontWeight: 600,
                  }}
                >
                  Administrator
                </div>

                <div
                  style={{
                    fontSize: 12,
                    color: "#666",
                  }}
                >
                  Universiti Sains Malaysia
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Welcome Banner */}

        <div
          style={{
            margin: 25,
            borderRadius: 22,
            padding: 30,
            background:
              "linear-gradient(135deg,#4B0082,#7C3AED)",
            color: "#fff",
            boxShadow:
              "0 20px 40px rgba(124,58,237,.25)",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 30,
            }}
          >
            Welcome Back 👋
          </h1>

          <p
            style={{
              marginTop: 10,
              opacity: 0.9,
            }}
          >
            Participant Registration & Attendance Management System
          </p>
        </div>

        {/* ================= Page Content ================= */}

        <div
          style={{
            flex: 1,
            padding: "0 25px 25px",
          }}
        >
          <Outlet />
        </div>

        {/* ================= Footer ================= */}

        <footer
          style={{
            background: "#fff",
            borderTop: "1px solid #e5e7eb",
            textAlign: "center",
            padding: 18,
            fontSize: 13,
            color: "#666",
          }}
        >
          <strong>Universiti Sains Malaysia</strong>

          <br />

          Participant Registration System

          <br />

          Version 1.0.0

          <br />

          © 2026 Developed by{" "}
          <strong>
            Assoc. Prof.Dr. Hazwani Ahmad Yusof @ Hanafi, PKTAAB, USM
          </strong>
        </footer>
      </main>
    </div>
  );
}
