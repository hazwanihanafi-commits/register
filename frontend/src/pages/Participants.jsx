import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import {
  generateCertificate,
  sendCertificate,
} from "../services/certificateApi";

const API_URL =
  "https://script.google.com/macros/s/AKfycbwL0N7FbMP7yoUKQ6FgrTPzIHrKesDkoD_EdIBL80xoaR0SH5Uos2CrUOg5kFtTAXiPUw/exec";

export default function Participants() {

  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    loadParticipants();
  }, []);

  async function loadParticipants() {

    const response = await fetch(API_URL + "?action=list");
    const data = await response.json();

    setParticipants(data);

  }

  async function handleGenerate(participant) {

    const result = await generateCertificate(participant.id);

    if (result.success) {

      alert("Certificate Generated!");

      if (result.pdfUrl) {
        window.open(result.pdfUrl, "_blank");
      }

      loadParticipants();

    } else {

      alert(result.message);

    }

  }

  async function handleEmail(participant) {

    const result = await sendCertificate(participant.id);

    if (result.success) {

      alert("Certificate emailed successfully!");

      loadParticipants();

    } else {

      alert(result.message);

    }

  }

  return (

    <MainLayout>

      <h1>Participants</h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: 20,
          background: "#fff",
        }}
      >

        <thead>

          <tr
            style={{
              background: "#4B0082",
              color: "white",
            }}
          >
            <th style={cell}>ID</th>
            <th style={cell}>Name</th>
            <th style={cell}>Organization</th>
            <th style={cell}>Status</th>
            <th style={cell}>Actions</th>
          </tr>

        </thead>

        <tbody>

          {participants.map((p) => (

            <tr key={p.id}>

              <td style={cell}>{p.id}</td>
              <td style={cell}>{p.name}</td>
              <td style={cell}>{p.organization}</td>
              <td style={cell}>{p.status}</td>

              <td style={cell}>

                <Link to={`/badge/${p.id}`}>
                  <button>Print QR</button>
                </Link>

                <button
                  style={{
                    marginLeft: 8,
                    background: "#4CAF50",
                    color: "#fff",
                    border: "none",
                    padding: "8px 12px",
                    cursor: "pointer",
                    borderRadius: 4,
                  }}
                  onClick={() => handleGenerate(p)}
                >
                  🎓 Generate
                </button>

                <button
                  style={{
                    marginLeft: 8,
                    background: "#1976D2",
                    color: "#fff",
                    border: "none",
                    padding: "8px 12px",
                    cursor: "pointer",
                    borderRadius: 4,
                  }}
                  onClick={() => handleEmail(p)}
                >
                  📧 Email
                </button>

              </td>

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
