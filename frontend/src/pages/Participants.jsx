import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import {
  generateCertificate,
  sendCertificate,
} from "../services/certificateApi";

import {
  sendBadgeEmail,
} from "../services/api";

const API_URL =
  "https://script.google.com/macros/s/AKfycbwL0N7FbMP7yoUKQ6FgrTPzIHrKesDkoD_EdIBL80xoaR0SH5Uos2CrUOg5kFtTAXiPUw/exec";

export default function Participants() {

  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    loadParticipants();
  }, []);

  async function loadParticipants() {

    const response = await fetch(`${API_URL}?action=list`);
    const data = await response.json();

    setParticipants(data);

  }

  // ============================
  // SEND BADGE
  // ============================

  async function handleSendBadge(participant) {

    const result = await sendBadgeEmail(participant.id);

    if (result.success) {

      alert("Badge emailed successfully!");

      loadParticipants();

    } else {

      alert(result.message);

    }

  }

  // ============================
  // GENERATE CERTIFICATE
  // ============================

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

  // ============================
  // SEND CERTIFICATE
  // ============================

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
              color: "#fff",
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

                {/* ================= Badge ================= */}

                <Link to={`/badge/${p.id}`}>

                  <button style={purpleBtn}>
                    🎫 View Badge
                  </button>

                </Link>

                {p.badgeSent === "YES" ? (

                  <button
                    style={greyBtn}
                    disabled
                  >
                    ✅ Badge Sent
                  </button>

                ) : (

                  <button
                    style={orangeBtn}
                    onClick={() => handleSendBadge(p)}
                  >
                    📧 Send Badge
                  </button>

                )}

                {/* ============ Certificate ============ */}

                {p.generated === "YES" ? (

                  <button
                    style={purpleBtn}
                    onClick={() => window.open(p.pdfUrl, "_blank")}
                  >
                    📄 View PDF
                  </button>

                ) : (

                  <button
                    style={greenBtn}
                    onClick={() => handleGenerate(p)}
                  >
                    🎓 Generate
                  </button>

                )}

                {p.emailSent === "YES" ? (

                  <button
                    style={greyBtn}
                    disabled
                  >
                    ✅ Certificate Sent
                  </button>

                ) : (

                  <button
                    style={blueBtn}
                    onClick={() => handleEmail(p)}
                  >
                    📧 Email Certificate
                  </button>

                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </MainLayout>

  );

}

// ============================
// Styles
// ============================

const cell = {
  border: "1px solid #ddd",
  padding: "12px",
};

const baseButton = {
  marginLeft: 8,
  marginBottom: 5,
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  cursor: "pointer",
  borderRadius: 4,
};

const purpleBtn = {
  ...baseButton,
  background: "#6A1B9A",
};

const orangeBtn = {
  ...baseButton,
  background: "#FF9800",
};

const greenBtn = {
  ...baseButton,
  background: "#4CAF50",
};

const blueBtn = {
  ...baseButton,
  background: "#1976D2",
};

const greyBtn = {
  ...baseButton,
  background: "#9E9E9E",
  cursor: "default",
};
