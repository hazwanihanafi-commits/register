import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const API_URL =
  "https://script.google.com/macros/s/AKfycbxaZo7TLncSnL48b7Au-HxWhNjRd3UZIaaK2JIvkL1nfhAtIPHzvPcEpwr0XBfG-dpDQQ/exec";

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

  return (

    <MainLayout>

      <h1>Participants</h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          background: "white",
        }}
      >

        <thead>

          <tr style={{ background: "#4B0082", color: "white" }}>
            <th style={cell}>ID</th>
            <th style={cell}>Name</th>
            <th style={cell}>Organization</th>
            <th style={cell}>Status</th>
            <th style={cell}>Action</th>
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
                  <button>
                    Print QR
                  </button>
                </Link>

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
