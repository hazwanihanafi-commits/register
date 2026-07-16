import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getParticipant } from "../services/api";

export default function Scanner() {
  const [scanResult, setScanResult] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!scanResult) {
      alert("Please scan or enter an ID.");
      return;
    }

    const result = await getParticipant(scanResult);

    if (result.success) {
      alert(
        "✅ Participant Found\n\n" +
          "Name : " +
          result.name +
          "\nOrganization : " +
          result.organization +
          "\nStatus : " +
          result.status
      );
    } else {
      alert("❌ Participant Not Found");
    }

    setScanResult("");
  }

  return (
    <MainLayout>
      <h1>QR / Barcode Scanner</h1>

      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          marginTop: "20px",
          maxWidth: "600px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <form onSubmit={handleSubmit}>
          <label
            style={{
              display: "block",
              marginBottom: "10px",
              fontWeight: "bold",
            }}
          >
            Scan QR / Barcode
          </label>

          <input
            type="text"
            autoFocus
            value={scanResult}
            onChange={(e) => setScanResult(e.target.value)}
            placeholder="Scan here..."
            style={{
              width: "100%",
              padding: "14px",
              fontSize: "18px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              marginBottom: "20px",
            }}
          />

          <button
            type="submit"
            style={{
              background: "#4B0082",
              color: "white",
              padding: "12px 25px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Check In
          </button>
        </form>

        <hr style={{ margin: "30px 0" }} />

        <h3>Last Scan</h3>

        <div
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            color: "#4B0082",
          }}
        >
          {scanResult || "-"}
        </div>

        <br />

        <p style={{ color: "#666" }}>
          💡 USB barcode scanners work like a keyboard. Click inside the input
          box and scan the participant QR/barcode.
        </p>
      </div>
    </MainLayout>
  );
}
