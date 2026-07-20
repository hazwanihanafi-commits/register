import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  QrCode,
  BarChart3,
  Bell,
  Search,
  UserCircle,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import "./MainLayout.css";

export default function MainLayout({ children }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menus = [
    {
      title: "Dashboard",
      path: "/",
      icon: <LayoutDashboard size={20} />,
    },
    {
      title: "Participants",
      path: "/participants",
      icon: <Users size={20} />,
    },
    {
      title: "Scanner",
      path: "/scanner",
      icon: <QrCode size={20} />,
    },
    {
      title: "Reports",
      path: "/reports",
      icon: <BarChart3 size={20} />,
    },
  ];

  return (
    <div className="layout">

      {/* ================= Sidebar ================= */}

      <aside
        className={`sidebar ${collapsed ? "collapsed" : ""}`}
      >

        <div className="logo-section">

          <div className="logo-circle">
            🎓
          </div>

          {!collapsed && (
            <>
              <h2>USM Register</h2>

              <span>
                Participant Registration
              </span>
            </>
          )}

        </div>

        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>

        <nav>

          {menus.map((menu) => (

            <Link
              key={menu.path}
              to={menu.path}
              className={
                location.pathname === menu.path
                  ? "menu active"
                  : "menu"
              }
            >
              {menu.icon}

              {!collapsed && (
                <span>{menu.title}</span>
              )}

            </Link>

          ))}

        </nav>

        <div className="sidebar-footer">

          {!collapsed && (

            <>
              <strong>
                Universiti Sains Malaysia
              </strong>

              <small>
                PKTAAB
              </small>

              <small>
                Version 1.0.0
              </small>
            </>

          )}

        </div>

      </aside>

      {/* ================= Main ================= */}

      <section className="main-content">

        {/* Top Navigation */}

        <header className="topbar">

          <div className="page-title">

            <h1>
              Participant Registration System
            </h1>

            <p>
              Universiti Sains Malaysia
            </p>

          </div>

          <div className="top-actions">

            <div className="search-box">

              <Search size={18} />

              <input
                type="text"
                placeholder="Search..."
              />

            </div>

            <button className="notify-btn">

              <Bell size={20} />

            </button>

            <div className="profile">

              <UserCircle size={42} />

              <div>

                <strong>
                  Administrator
                </strong>

                <span>
                  PKTAAB
                </span>

              </div>

            </div>

          </div>

        </header>

        {/* Welcome Card */}

        <div className="welcome-card">

          <div>

            <h2>
              Welcome Back 👋
            </h2>

            <p>
              Manage participant registration,
              QR check-in, badges and reports
              from one dashboard.
            </p>

          </div>

          <div className="welcome-right">

            <div className="system-status">

              <span className="dot"></span>

              System Online

            </div>

                    {/* ================= Page Content ================= */}

        <main className="page-content">

          {children}

        </main>

        {/* ================= Footer ================= */}

        <footer className="footer">

          <div className="footer-left">

            <strong>
              Universiti Sains Malaysia
            </strong>

            <p>
              Participant Registration System
            </p>

          </div>

          <div className="footer-center">

            © 2026 Developed by

            <br />

            <strong>
              Assoc. Prof. Dr. Hazwani Ahmad Yusof @ Hanafi
            </strong>

          </div>

          <div className="footer-right">

            Version 1.0.0

          </div>

        </footer>

      </section>

    </div>

  );

}

          </div>

        </div>
