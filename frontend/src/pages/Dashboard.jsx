import MainLayout from "../layouts/MainLayout";

export default function Dashboard() {
  return (
    <MainLayout>
      <h1>Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <Card title="Participants" value="500" />
        <Card title="Registered" value="320" />
        <Card title="Pending" value="180" />
        <Card title="Attendance %" value="64%" />
      </div>
    </MainLayout>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  );
}
