import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usmLogo from "../assets/usm.png";
import iceeLogo from "../assets/icee.png";
import "./Badge.css";

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
    ? 24
    : participant.name.length > 18
    ? 28
    : 32;

  return (
    <div
      className="badge"
      style={{
        width: "90mm",
        height: "120mm",
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
        padding: "2px 8px",
borderRadius: 14,
        }}
      >
        {/* USM Banner */}
<div
  style={{
    display: "inline-block",
    background: "#FFFFFF",
    padding: "4px 10px",
    borderRadius: 12,
    margin: "0 auto 8px",
    boxShadow: "0 3px 8px rgba(0,0,0,.15)",
  }}
>
  <img
    src={usmLogo}
    alt="USM Banner"
    style={{
      width:120,
      height: "auto",
      display: "block",
      objectFit: "contain",
    }}
  />
</div>

        {/* ICEE 2026 */}
        <h1
  style={{
    margin: "0 0 4px",
    fontSize: 26,
            fontWeight: 800,
            letterSpacing: 1,
            lineHeight: 1,
          }}
        >
          ICEE 2026
        </h1>

        <div
  style={{
    width: 70,
    height: 3,
    background: "#FFC107",
    borderRadius: 3,
    margin: "10px auto 12px",
  }}
/>

        {/* Conference Title */}
        <div
          style={{
            marginTop: 10,
            fontSize:13,
lineHeight:1.3,
            fontWeight: 500,
          }}
        >
          21<sup>st</sup> International Conference on
          <br />
          Environmental Ergonomics
        </div>

  
      </div>

      {/* =========================
          BODY
      ========================== */}
      <div
  style={{
    flex: 1,
    padding: "8px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    textAlign: "center",
  }}
>
                {/* Participant Category */}
        <div
          style={{
            background: badgeColor,
            color: "#fff",
            padding:"6px 22px",
            borderRadius: 30,
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: 1,
            marginBottom: 10,
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
            margin:"0 0 6px",
            wordBreak: "break-word",
          }}
        >
          {participant.name}
        </h2>

        {/* QR Code */}
        <div
          style={{
            background: "#fff",
            padding: 6,
            borderRadius: 12,
            border: "2px solid #E0E0E0",
            boxShadow: "0 3px 10px rgba(0,0,0,.08)",
          }}
        >
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${participant.id}`}
            alt="QR Code"
            style={{
             width:100,
height:100,
              display: "block",
            }}
          />
        </div>

       {/* Participant ID */}
<div
  style={{
    marginTop: 6,
    color: "#4B0082",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 2,
  }}
>
  {participant.id}
</div>
        
        {/* ICEE Logo */}
<img
  src={iceeLogo}
  alt="ICEE Logo"
  style={{
    width: 40,
    height: "auto",
    marginTop: 2,
    marginBottom: 2,
    display: "block",
    objectFit: "contain",
  }}
/>


      </div>

      {/* =========================
          FOOTER
      ========================== */}
      <div
  style={{
    background: "#F5F5F5",
    borderTop: "1px solid #DDD",
    padding: "3px",
    textAlign: "center",
    fontSize: 10,
    fontWeight: 600,
    color: "#666",
  }}
>
  ICEE 2026 • Universiti Sains Malaysia
</div>
    </div>
  );
}
