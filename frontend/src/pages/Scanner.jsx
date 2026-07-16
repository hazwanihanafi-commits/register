import { useState } from "react";
import MainLayout from "../layouts/MainLayout";

export default function Scanner() {
  const [scanResult, setScanResult] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    alert("Scanned ID : " + scanResult);

    // Nanti kita sambung dengan Google Apps Script
  }

  return (
    <MainLayout>
      <h1>QR / Barcode Scanner</h1>

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          marginTop: "20px",
          maxWidth: "500px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <label>Scan QR / Barcode</label>

          <input
            autoFocus
            value={scanResult}
            onChange={(e) => setScanResult(e.target.value)}
            placeholder="Scan here..."
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "18px",
              marginTop: "10px",
              marginBottom: "20px",
            }}
          />

          <button
            style={{
              padding: "12px 25px",
              background: "#4B0082",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Check In
          </button>
        </form>

        <br />

        <h3>Last Scan</h3>

        <h2>{scanResult}</h2>
      </div>
    </MainLayout>
  );
}
