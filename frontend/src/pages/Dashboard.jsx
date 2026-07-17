import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

const API_URL =
  "https://script.google.com/macros/s/AKfycbwL0N7FbMP7yoUKQ6FgrTPzIHrKesDkoD_EdIBL80xoaR0SH5Uos2CrUOg5kFtTAXiPUw/exec";

export default function Dashboard() {

  const [stats, setStats] = useState({
    total: 0,
    registered: 0,
    pending: 0,
    attendance: 0,
  });

  useEffect(() => {

    loadDashboard();

  }, []);

  async function loadDashboard() {

    try {

      const response = await fetch(
        `${API_URL}?action=stats`
      );

      const data = await response.json();

      setStats(data);

    } catch (err) {

      console.log(err);

    }

  }

  return (

    <MainLayout>

      <h1
        style={{
          fontSize: "40px",
          fontWeight: "700",
          marginBottom: "25px"
        }}
      >
        Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
        }}
      >

        <Card
          title="Participants"
          value={stats.total}
          color="#4F46E5"
        />

        <Card
          title="Registered"
          value={stats.registered}
          color="#10B981"
        />

        <Card
          title="Pending"
          value={stats.pending}
          color="#F59E0B"
        />

        <Card
          title="Attendance"
          value={stats.attendance + "%"}
          color="#8B5CF6"
        />

      </div>

    </MainLayout>

  );

}

function Card({ title, value, color }) {

  return (

    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "25px",
        boxShadow: "0 5px 20px rgba(0,0,0,.08)",
        borderLeft: `6px solid ${color}`
      }}
    >

      <p
        style={{
          color: "#666",
          fontWeight: "600",
          marginBottom: "10px"
        }}
      >
        {title}
      </p>

      <h1
        style={{
          fontSize: "42px",
          margin: 0
        }}
      >
        {value}
      </h1>

    </div>

  );

}
