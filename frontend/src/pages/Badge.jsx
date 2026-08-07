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
  <style>{`
    @media print {
      body {
        margin: 0;
      }

      .badge {
        box-shadow: none !important;
        border: 2px solid #4B0082 !important;
      }
    }
  `}</style>

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
        <h1 style={{ margin: 0 }}>ICEE 2026</h1>

        <div style={{ fontSize: 15 }}>
          21st International Conference on
          Environmental Ergonomics
        </div>

        <div style={{ marginTop: 8, fontSize: 13 }}>
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
            display: "inline-block",
            background:
              participant.tagCategory === "Invited speaker"
                ? "#8E24AA"
                : participant.tagCategory === "VIP"
                ? "#D32F2F"
                : participant.tagCategory === "Committee"
                ? "#2E7D32"
                : "#1976D2",
            color: "#fff",
            padding: "6px 16px",
            borderRadius: "20px",
            fontSize: 13,
            fontWeight: "bold",
          }}
        >
          {participant.tagCategory || "PARTICIPANT"}
        </div>

        <h2
          style={{
            color: "#4B0082",
            marginTop: 15,
            marginBottom: 20,
          }}
        >
          {participant.name}
        </h2>

        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${participant.id}`}
          alt="QR"
          style={{
            width: 220,
            height: 220,
          }}
        />

        <h3
          style={{
            color: "#4B0082",
            marginTop: 20,
          }}
        >
          {participant.id}
        </h3>
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
  
