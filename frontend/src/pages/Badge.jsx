import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL =
  "https://script.google.com/macros/s/AKfycbwL0N7FbMP7yoUKQ6FgrTPzIHrKesDkoD_EdIBL80xoaR0SH5Uos2CrUOg5kFtTAXiPUw/exec";

export default function Badge() {
  const { id } = useParams();
  const [participant, setParticipant] = useState(null);

  useEffect(() => {
    loadParticipant();
  }, []);

  async function loadParticipant() {
    const response = await fetch(
      `${API_URL}?id=${encodeURIComponent(id)}`
    );

    const data = await response.json();

    setParticipant(data);
  }

  useEffect(() => {
    if (participant) {
      setTimeout(() => {
        window.print();
      }, 500);
    }
  }, [participant]);

  if (!participant) {
    return <h2 style={{ padding: 40 }}>Loading...</h2>;
  }

  return (
    <>
      <style>
        {`
        @media print{
          body{
            margin:0;
          }

          .badge{
            box-shadow:none !important;
            border:2px solid #4B0082 !important;
          }
        }
        `}
      </style>

      <div
        className="badge"
        style={{
          width: 420,
          margin: "20px auto",
          borderRadius: 20,
          overflow: "hidden",
          border: "3px solid #4B0082",
          boxShadow: "0 10px 25px rgba(0,0,0,.2)",
          background: "#fff",
          fontFamily: "Arial",
        }}
      >
        {/* Header */}

        <div
          style={{
            background: "#4B0082",
            color: "#fff",
            padding: 20,
            textAlign: "center",
          }}
        >
          <h1 style={{ margin: 0 }}>
            ICEE 2026
          </h1>

          <div style={{ fontSize: 15 }}>
            21st International Conference on
            Environmental Ergonomics
          </div>

          <div
            style={{
              marginTop: 8,
              fontSize: 13,
            }}
          >
            Universiti Sains Malaysia
          </div>
        </div>

        {/* Body */}

        <div
          style={{
            padding: 25,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: "#666",
            }}
          >
            PARTICIPANT
          </div>

          <h2
            style={{
              color: "#4B0082",
              marginTop: 10,
              marginBottom: 5,
            }}
          >
            {participant.name}
          </h2>

          <div
            style={{
              fontSize: 17,
              fontWeight: "bold",
            }}
          >
            {participant.organization}
          </div>

          <div
            style={{
              marginTop: 10,
              color: "#666",
            }}
          >
            {participant.role || "Participant"}
          </div>

          <img
            style={{
              marginTop: 25,
              width: 220,
              height: 220,
            }}
            src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${participant.id}`}
            alt="QR"
          />

          <h3
            style={{
              marginTop: 20,
              color: "#4B0082",
            }}
          >
            {participant.id}
          </h3>

          <div
            style={{
              marginTop: 15,
              fontSize: 13,
              color: "#555",
            }}
          >
            Please present this badge during
            conference registration.
          </div>
        </div>

        {/* Footer */}

        <div
          style={{
            background: "#f5f5f5",
            padding: 15,
            textAlign: "center",
            fontSize: 12,
          }}
        >
          ICEE 2026 • Universiti Sains Malaysia
        </div>
      </div>
    </>
  );
}
