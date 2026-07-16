import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getParticipant, checkIn } from "../services/api";

export default function Scanner() {
  const [scanResult, setScanResult] = useState("");
  const [participant, setParticipant] = useState(null);
  const [message, setMessage] = useState("");

  async function searchParticipant(e) {
    e.preventDefault();

    setMessage("");

    const result = await getParticipant(scanResult);

    if (result.success) {
      setParticipant(result);
    } else {
      setParticipant(null);
      setMessage("❌ Participant not found");
    }
  }

  async function registerParticipant() {
    const result = await checkIn(participant.id);

    if (result.success) {
      setMessage("✅ Check-in Successful");

      setParticipant({
        ...participant,
        status: "Registered",
      });
    } else {
      setMessage("❌ Check-in Failed");
    }
  }

  return (
    <MainLayout>
      <h1>QR / Barcode Registration</h1>

      <form onSubmit={searchParticipant}>
        <input
          value={scanResult}
          onChange={(e) => setScanResult(e.target.value)}
          placeholder="Scan QR / Barcode"
          autoFocus
          style={{
            width: "300px",
            padding: "12px",
            fontSize: "18px",
          }}
        />

        <button
          style={{
            marginLeft: "10px",
            padding: "12px 20px",
          }}
        >
          Search
        </button>
      </form>

      <br />

      {message && (
        <h3 style={{ color: "green" }}>
          {message}
        </h3>
      )}

      {participant && (
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "20px",
            width: "450px",
            boxShadow: "0 0 10px #ddd",
          }}
        >
          <h2>{participant.name}</h2>

          <p>
            <b>ID :</b> {participant.id}
          </p>

          <p>
            <b>Organization :</b> {participant.organization}
          </p>

          <p>
            <b>Status :</b> {participant.status}
          </p>

          {participant.status === "Pending" && (
            <button
              onClick={registerParticipant}
              style={{
                background: "#4B0082",
                color: "white",
                padding: "12px 25px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Check In
            </button>
          )}
        </div>
      )}
    </MainLayout>
  );
}
