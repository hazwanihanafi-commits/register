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
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (participant && !printed) {
      setPrinted(true);

      setTimeout(() => {
        window.print();
      }, 500);
    }
  }, [participant, printed]);

  if (!participant) {
    return <h2 style={{ padding: 40 }}>Loading...</h2>;
  }

  const categoryColors = {
    VIP: "#D32F2F",
    Committee: "#2E7D32",
    "Invited Speaker": "#8E24AA",
    "Invited speaker": "#8E24AA",
    Sponsor: "#FB8C00",
    Exhibitor: "#00897B",
  };

  const badgeColor =
    categoryColors[participant.tagCategory] || "#1976D2";

 return (
  <div
    className="badge"
    style={{
      width: "90mm",
      height: "140mm",
      margin: "20px auto",
      borderRadius: 18,
      overflow: "hidden",
      border: "3px solid #4B0082",
      background: "#fff",
      boxShadow: "0 10px 25px rgba(0,0,0,.2)",
      fontFamily: "Arial, Helvetica, sans-serif",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* HEADER */}
    <div
      style={{
        background: "#4B0082",
        color: "#fff",
        textAlign: "center",
        padding: "18px 20px 22px",
      }}
    >
      <img
        src={usmLogo}
        alt="USM Logo"
        style={{
          width: 120,
height: "auto",
          objectFit: "contain",
          display: "block",
          margin: "0 auto 15px",
        }}
      />

      <h1
        style={{
          margin: 0,
          fontSize: 42,
          fontWeight: 800,
          letterSpacing: 1,
        }}
      >
        ICEE 2026
      </h1>

      <div
        style={{
          marginTop: 8,
          fontSize: 17,
fontWeight: 500,
          lineHeight: 1.45,
        }}
      >
        21<sup>st</sup> International Conference on
        <br />
        Environmental Ergonomics
      </div>

      <div
        style={{
          marginTop: 10,
         fontSize: 18,
fontWeight: 700,
color: "#FFD54F",
        }}
      >
        Universiti Sains Malaysia
      </div>
    </div>

    {/* BODY */}
    <div
      style={{
        flex: 1,
        textAlign: "center",
        padding: "18px 18px",
      }}
    >
      {/* CATEGORY */}
      <div
        style={{
          display: "inline-block",
          background: badgeColor,
          color: "#fff",
          padding: "8px 28px",
borderRadius: 30,
fontSize: 15,
letterSpacing: 0.5,
          fontWeight: "bold",
          marginBottom: 18,
        }}
      >
        {(participant.tagCategory || "Participant").toUpperCase()}
      </div>

      {/* NAME */}
      <h2
        style={{
          color: "#4B0082",
          fontSize:
            participant.name.length > 18
  ? 34
  : 42,
          fontWeight: 800,
          lineHeight: 1.1,
          margin: "0 0 25px",
          textTransform: "uppercase",
        }}
      >
        {participant.name}
      </h2>

      {/* QR */}
      <div
        style={{
          display: "inline-block",
          background: "#fff",
          padding: 8,
          borderRadius: 12,
          border: "2px solid #ddd",
        }}
      >
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${participant.id}`}
          alt="QR"
          style={{
           width: 200,
height: 200,
          }}
        />
      </div>

      {/* ID */}
      <div
        style={{
          marginTop: 18,
          fontSize: 30,
          fontWeight: "bold",
          color: "#4B0082",
          letterSpacing: 2,
        }}
      >
        {participant.id}
      </div>

      {/* ICEE LOGO */}
      <img
        src={iceeLogo}
        alt="ICEE Logo"
        style={{
          width: 140,
height: "auto",
margin: "12px auto 0",
          objectFit: "contain",
          display: "block",
          margin: "18px auto 0",
        }}
      />
    </div>

    {/* FOOTER */}
    <div
      style={{
        background: "#F3F3F3",
        textAlign: "center",
        padding: "12px",
        fontSize: 13,
fontWeight: 600,
borderTop: "1px solid #ddd",
        color: "#555",
      }}
    >
      ICEE 2026 • Universiti Sains Malaysia
    </div>
  </div>
);
  }
