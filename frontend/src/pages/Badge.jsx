import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL =
  "https://script.google.com/macros/s/AKfycbxaZo7TLncSnL48b7Au-HxWhNjRd3UZIaaK2JIvkL1nfhAtIPHzvPcEpwr0XBfG-dpDQQ/exec";

export default function Badge() {

  const { id } = useParams();

  const [participant, setParticipant] = useState(null);

  useEffect(() => {

    loadParticipant();

  }, []);

  async function loadParticipant() {

    const response = await fetch(
      `${API_URL}?id=${encodeURIComponent(id)}`
    );

    const data = await response.json();

    setParticipant(data);

    setTimeout(() => {
      window.print();
    }, 1000);

  }

  if (!participant) {

    return <h2 style={{padding:40}}>Loading...</h2>;

  }

  return (

    <div
      style={{
        width: "400px",
        margin: "40px auto",
        textAlign: "center",
        border: "2px solid #4b0082",
        borderRadius: "12px",
        padding: "25px",
        fontFamily: "Arial"
      }}
    >

      <h1 style={{color:"#4b0082"}}>
        USM REGISTER
      </h1>

      <hr/>

      <h2>{participant.name}</h2>

      <p>{participant.organization}</p>

      <h3>{participant.id}</h3>

      <img
        src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${participant.id}`}
        alt="QR Code"
      />

      <p style={{marginTop:20}}>
        Scan this QR during registration
      </p>

    </div>

  );

}
