import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import MainLayout from "../layouts/MainLayout";
import { getParticipant, checkIn } from "../services/api";

export default function Scanner() {

  const [participant, setParticipant] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: 250
      },
      false
    );

    scanner.render(onScanSuccess, onScanFailure);

    async function onScanSuccess(decodedText) {

      scanner.clear();

      setMessage("Searching participant...");

      const person = await getParticipant(decodedText);

      if (!person.success) {
        setMessage("❌ Participant not found");

        setTimeout(() => {
          window.location.reload();
        }, 3000);

        return;
      }

      const register = await checkIn(person.id);

      if (register.success) {

        setParticipant({
          ...person,
          status: "Registered"
        });

        setMessage("✅ Registration Successful");

      } else {

        setMessage("Registration Failed");

      }

      setTimeout(() => {

        window.location.reload();

      },3000);

    }

    function onScanFailure(error) {}

    return ()=>{

      scanner.clear().catch(()=>{});

    };

  },[]);

  return (

    <MainLayout>

      <h1>QR Registration Scanner</h1>

      <div
        id="reader"
        style={{
          width:"500px",
          marginTop:"20px"
        }}
      ></div>

      <br/>

      <h2>{message}</h2>

      {participant && (

        <div
          style={{
            background:"white",
            padding:"20px",
            borderRadius:"10px",
            width:"450px",
            boxShadow:"0 0 10px #ddd"
          }}
        >

          <h2>{participant.name}</h2>

          <p><b>ID :</b> {participant.id}</p>

          <p><b>Organization :</b> {participant.organization}</p>

          <p><b>Status :</b> {participant.status}</p>

        </div>

      )}

    </MainLayout>

  );

}
