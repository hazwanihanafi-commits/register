import MainLayout from "../layouts/MainLayout";

const participants = [
  {
    id: "ST001",
    name: "Ahmad Ali",
    organization: "USM",
    status: "Registered",
  },
  {
    id: "ST002",
    name: "Siti Aminah",
    organization: "UPM",
    status: "Pending",
  },
];

export default function Participants() {
  return (
    <MainLayout>
      <h1>Participants</h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          background: "white",
        }}
      >
        <thead>
          <tr style={{ background: "#4B0082", color: "white" }}>
            <th style={cell}>ID</th>
            <th style={cell}>Name</th>
            <th style={cell}>Organization</th>
            <th style={cell}>Status</th>
          </tr>
        </thead>

        <tbody>
          {participants.map((p) => (
            <tr key={p.id}>
              <td style={cell}>{p.id}</td>
              <td style={cell}>{p.name}</td>
              <td style={cell}>{p.organization}</td>
              <td style={cell}>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  );
}

const cell = {
  border: "1px solid #ddd",
  padding: "12px",
};
