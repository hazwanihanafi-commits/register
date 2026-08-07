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
        width: 420,
        margin: "20px auto",
        borderRadius: 20,
        overflow: "hidden",
        border: "3px solid #4B0082",
        boxShadow: "0 10px 25px rgba(0,0,0,.2)",
        background: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
<div
  style={{
    background: "#4B0082",
    color: "#fff",
    padding: "25px 20px",
    textAlign: "center",
  }}
>
  {/* USM Logo */}
  <img
    src={usmLogo}
    alt="USM Logo"
    style={{
      width: 85,
      display: "block",
      margin: "0 auto 12px",
    }}
  />

  {/* ICEE Logo */}
  <img
    src={iceeLogo}
    alt="ICEE Logo"
    style={{
      width: 120,
      display: "block",
      margin: "0 auto 15px",
    }}
  />

  {/* Conference Title */}
  <h1
    style={{
      margin: 0,
      fontSize: 30,
      fontWeight: "bold",
      letterSpacing: 1,
    }}
  >
    ICEE 2026
  </h1>

  <div
    style={{
      marginTop: 8,
      fontSize: 15,
      lineHeight: 1.5,
    }}
  >
    21<sup>st</sup> International Conference on
    <br />
    Environmental Ergonomics
  </div>

  <div
    style={{
      marginTop: 10,
      fontSize: 13,
      opacity: 0.9,
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
        {/* Show category only if NOT Participant */}
        <div
  style={{
    display: "inline-block",
    background: badgeColor,
    color: "#fff",
    padding: "8px 18px",
    borderRadius: 25,
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 20,
  }}
>
  {participant.tagCategory || "Participant"}
</div>
            <div
              style={{
                display: "inline-block",
                background: badgeColor,
                color: "#fff",
                padding: "8px 18px",
                borderRadius: 25,
                fontSize: 14,
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              {participant.tagCategory}
            </div>
          )}

        {/* Name */}
        <h2
          style={{
            color: "#4B0082",
            fontSize: 38,
            fontWeight: "bold",
            textTransform: "uppercase",
            margin: "15px 0 25px",
            lineHeight: 1.2,
            letterSpacing: "1px",
          }}
        >
          {participant.name}
        </h2>

        {/* QR Code */}
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${participant.id}`}
          alt="QR Code"
          style={{
            width: 220,
            height: 220,
          }}
        />

        {/* ID */}
        <h3
          style={{
            color: "#4B0082",
            marginTop: 20,
            fontSize: 24,
            letterSpacing: 1,
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
          color: "#555",
        }}
      >
        ICEE 2026 • Universiti Sains Malaysia
      </div>
    </div>
  );
}
