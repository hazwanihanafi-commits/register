import { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import MainLayout from "../layouts/MainLayout";
import { getParticipant, checkIn } from "../services/api";

export default function Scanner() {
  const [participant, setParticipant] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("reader");

    let scanning = true;

    const config = {
      fps: 30,
      qrbox: {
        width: 220,
        height: 220,
      },
      aspectRatio: 1.0,
    };

    html5QrCode
      .start(
        { facingMode: "environment" },
        config,
        async (decodedText) => {
          if (!scanning) return;

          scanning = false;

          try {
            const qr = String(decodedText).trim();

            console.log("QR:", qr);

            setMessage("Searching participant...");

            await html5QrCode.stop();

            const person = await getParticipant(qr);

            console.log(person);

            if (!person.success) {
              setMessage("❌ Participant not found");

              setTimeout(() => {
                window.location.reload();
              }, 2500);

              return;
            }

            setMessage("Registering...");

            const result = await checkIn(person.id);

            console.log(result);

            if (result.success) {
              setParticipant({
                ...person,
                status: "Registered",
              });

              setMessage("✅ Registration Successful");
            } else {
              setMessage(result.message || "❌ Registration Failed");
            }

            setTimeout(() => {
              window.location.reload();
            }, 2500);
          } catch (err) {
            console.error(err);

            setMessage("❌ " + err.message);

            setTimeout(() => {
              window.location.reload();
            }, 2500);
          }
        },
        () => {
          // Ignore scan errors
        }
      )
      .catch(console.error);

    return () => {
      html5QrCode
        .stop()
        .then(() => html5QrCode.clear())
        .catch(() => {});
    };
  }, []);

  return (
    <MainLayout>
      <h1>QR Registration Scanner</h1>

      <div
        id="reader"
        style={{
          width: "420px",
          margin: "30px auto",
        }}
      ></div>

      <h2>{message}</h2>

      {participant && (
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            width: "420px",
            margin: "20px auto",
            boxShadow: "0 2px 10px rgba(0,0,0,.15)",
          }}
        >
          <h2>{participant.name}</h2>

          <p>
            <b>ID:</b> {participant.id}
          </p>

          <p>
            <b>Organization:</b> {participant.organization}
          </p>

          <p>
            <b>Status:</b> {participant.status}
          </p>
        </div>
      )}
    </MainLayout>
  );
}
