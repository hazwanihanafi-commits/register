import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

import { getStats } from "../services/api";

export default function Dashboard() {

  const [stats, setStats] = useState({
    total: 0,
    checkedIn: 0,
    certificates: 0,
    emailsSent: 0,
    badgeSent: 0,
  });

  // ============================================================
  // ATTENDANCE %
  // ============================================================

  const attendancePercentage =
    stats.total > 0
      ? Math.round(
          (stats.checkedIn / stats.total) * 100
        )
      : 0;

  // ============================================================
  // LOAD DASHBOARD
  // ============================================================

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {

    try {

      const data = await getStats();

      console.log(
        "DASHBOARD STATS:",
        data
      );

      if (data?.success) {

        setStats({
          total: Number(data.total || 0),
          checkedIn: Number(data.checkedIn || 0),
          certificates: Number(data.certificates || 0),
          emailsSent: Number(data.emailsSent || 0),
          badgeSent: Number(data.badgeSent || 0),
        });

      } else {

        console.error(
          "Dashboard API Error:",
          data?.message
        );

      }

    } catch (error) {

      console.error(
        "Unable to load dashboard:",
        error
      );

    }

  }

  return (

    <MainLayout>

      <h1
        style={{
          fontSize: "40px",
          fontWeight: "700",
          marginBottom: "25px",
        }}
      >
        Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
        }}
      >

        {/* PARTICIPANTS */}

        <Card
          title="Participants"
          value={stats.total}
          color="#4F46E5"
        />

        {/* CHECKED IN */}

        <Card
          title="Checked In"
          value={stats.checkedIn}
          color="#10B981"
        />

        {/* CERTIFICATES */}

        <Card
          title="Certificates"
          value={stats.certificates}
          color="#F59E0B"
        />

        {/* CERTIFICATE EMAILS */}

        <Card
          title="Certificate Emails Sent"
          value={stats.emailsSent}
          color="#8B5CF6"
        />

        {/* ATTENDANCE */}

        <Card
          title="Attendance"
          value={`${attendancePercentage}%`}
          color="#EC4899"
        />

      </div>

    </MainLayout>

  );
}


// ============================================================
// CARD
// ============================================================

function Card({
  title,
  value,
  color,
}) {

  return (

    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "25px",
        boxShadow:
          "0 5px 20px rgba(0,0,0,.08)",
        borderLeft:
          `6px solid ${color}`,
      }}
    >

      <p
        style={{
          color: "#666",
          fontWeight: "600",
          marginBottom: "10px",
        }}
      >
        {title}
      </p>

      <h1
        style={{
          fontSize: "42px",
          margin: 0,
        }}
      >
        {value}
      </h1>

    </div>

  );
}
