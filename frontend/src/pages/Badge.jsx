import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usmLogo from "../assets/usm.png";
import iceeLogo from "../assets/icee.png";

const API_URL =
  "https://script.google.com/macros/s/AKfycbwL0N7FbMP7yoUKQ6FgrTPzIHrKesDkoD_EdIBL80xoaR0SH5Uos2CrUOg5kFtTAXiPUw/exec";

export default function Badge() {
  const { id } = useParams();

  const [participant, setParticipant] = useState(null);
  const [printed, setPrinted] = useState(false);

  useEffect(() => {
    loadParticipant();
  }, []);

  async function loadParticipant() {
    try {
      const response = await fetch(
        `${API_URL}?id=${encodeURIComponent(id)}`
      );

      const data = await response.json();
      setParticipant(data);
    } catch (err) {
      console.error("Unable to load participant", err);
    }
  }

  useEffect(() => {
    if (participant && !printed) {
      setPrinted(true);

      setTimeout(() => {
        window.print();
      }, 700);
    }
  }, [participant, printed]);

  if (!participant) {
    return (
      <div
        style={{
          padding: 60,
          textAlign: "center",
          fontSize: 22,
          fontWeight: "bold",
          color: "#4B0082",
        }}
      >
        Loading badge...
      </div>
    );
  }

  const categoryColors = {
    VIP: "#C62828",
    Committee: "#2E7D32",
    Sponsor: "#EF6C00",
    Exhibitor: "#00897B",
    "Invited Speaker": "#7B1FA2",
    "Invited speaker": "#7B1FA2",
  };

  const badgeColor =
    categoryColors[participant.tagCategory] || "#1565C0";

  const nameFont =
    participant.name.length > 24
      ? 30
      : participant.name.length > 18
      ? 34
      : 40;

  return (
    <div
      className="badge"
      style={{
        width: "90mm",
        minHeight: "140mm",
        margin: "15px auto",
        borderRadius: 18,
        overflow: "hidden",
        border: "3px solid #4B0082",
        background: "#fff",
        boxShadow: "0 8px 20px rgba(0,0,0,.25)",
        fontFamily: "Arial, Helvetica, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >

            {/* =========================
          HEADER
      ========================== */}
      <div
        style={{
          background: "linear-gradient(180deg, #4B0082 0%, #5E35B1 100%)",
          color: "#fff",
          textAlign: "center",
          padding: "15px 20px 18px",
        }}
      >
        {/* USM Logo */}
        <img
          src={usmLogo}
          alt="USM Logo"
          style={{
            width: 115,
            height: "auto",
            display: "block",
            margin: "0 auto 12px",
            objectFit: "contain",
          }}
        />

        {/* ICEE 2026 */}
        <h1
          style={{
            margin: 0,
            fontSize: 38,
            fontWeight: 800,
            letterSpacing: 1,
            lineHeight: 1,
          }}
        >
          ICEE 2026
        </h1>

        {/* Conference Title */}
        <div
          style={{
            marginTop: 10,
            fontSize: 16,
            lineHeight: 1.45,
            fontWeight: 500,
          }}
        >
          21<sup>st</sup> International Conference on
          <br />
          Environmental Ergonomics
        </div>

        {/* USM */}
        <div
          style={{
            marginTop: 12,
            fontSize: 17,
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: 0.5,
          }}
        >
          Universiti Sains Malaysia
        </div>
      </div>

      {/* =========================
          BODY
      ========================== */}
      <div
        style={{
          flex: 1,
          padding: "18px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
                {/* Participant Category */}
        <div
          style={{
            background: badgeColor,
            color: "#fff",
            padding: "8px 28px",
            borderRadius: 30,
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: 1,
            marginBottom: 18,
            boxShadow: "0 3px 8px rgba(0,0,0,.15)",
          }}
        >
          {(participant.tagCategory || "PARTICIPANT").toUpperCase()}
        </div>

        {/* Participant Name */}
        <h2
          style={{
            color: "#4B0082",
            fontSize: nameFont,
            fontWeight: 800,
            textTransform: "uppercase",
            lineHeight: 1.15,
            letterSpacing: 1,
            margin: "0 0 20px",
            wordBreak: "break-word",
          }}
        >
          {participant.name}
        </h2>

        {/* QR Code */}
        <div
          style={{
            background: "#fff",
            padding: 10,
            borderRadius: 12,
            border: "2px solid #E0E0E0",
            boxShadow: "0 3px 10px rgba(0,0,0,.08)",
          }}
        >
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${participant.id}`}
            alt="QR Code"
            style={{
              width: 180,
              height: 180,
              display: "block",
            }}
          />
        </div>

        {/* Participant ID */}
        <div
          style={{
            marginTop: 16,
            color: "#4B0082",
            fontSize: 28,
            fontWeight: "bold",
            letterSpacing: 3,
          }}
        >
          {participant.id}
        </div>

        {/* ICEE Logo */}
        <img
          src={iceeLogo}
          alt="ICEE Logo"
          style={{
            width: 110,
            height: "auto",
            marginTop: 14,
            objectFit: "contain",
          }}
        />
                {/* Push footer to bottom */}
        <div style={{ flexGrow: 1 }} />

      </div>

      {/* =========================
          FOOTER
      ========================== */}
      <div
        style={{
          background: "#F5F5F5",
          borderTop: "1px solid #DDDDDD",
          padding: "10px",
          textAlign: "center",
          fontSize: 12,
          color: "#555",
          fontWeight: 600,
          letterSpacing: 0.5,
        }}
      >
        ICEE 2026 • Universiti Sains Malaysia
      </div>
    </div>
  );
}
