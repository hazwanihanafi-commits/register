import { useEffect, useState } from "react";
import BadgeCard from "../components/BadgeCard";
import "./PrintBadges.css";

const API_URL =
  "https://script.google.com/macros/s/AKfycbwL0N7FbMP7yoUKQ6FgrTPzIHrKesDkoD_EdIBL80xoaR0SH5Uos2CrUOg5kFtTAXiPUw/exec";

export default function PrintBadges() {

  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadParticipants();
  }, []);

  async function loadParticipants() {

    try {

      const response = await fetch(
        `${API_URL}?action=list`
      );

      const data = await response.json();

      setParticipants(data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    if (!loading && participants.length > 0) {

      setTimeout(() => {

        window.print();

      }, 1500);

    }

  }, [loading, participants]);

  if (loading) {

    return (

      <div
        style={{
          padding:50,
          textAlign:"center",
          fontSize:24,
          fontWeight:"bold"
        }}
      >
        Preparing badges...
      </div>

    );

  }

  return (

  <>

    {/* Toolbar */}
    <div
      className="no-print"
      style={{
        position: "sticky",
        top: 0,
        background: "#fff",
        padding: "15px",
        textAlign: "center",
        borderBottom: "1px solid #ddd",
        zIndex: 9999,
      }}
    >

      <button
        onClick={() => window.print()}
        style={{
          background: "#4B0082",
          color: "#fff",
          border: "none",
          padding: "12px 24px",
          borderRadius: 8,
          cursor: "pointer",
          marginRight: 10,
          fontWeight: "bold",
        }}
      >
        📄 Save as PDF
      </button>

      <button
        onClick={() => window.history.back()}
        style={{
          background: "#666",
          color: "#fff",
          border: "none",
          padding: "12px 24px",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        ⬅ Back
      </button>

    </div>

    <div className="print-container">

      {participants.map((participant) => (

        <div
          className="print-page"
          key={participant.id}
        >

          <BadgeCard participant={participant} />

        </div>

      ))}

    </div>

  </>

);

}
