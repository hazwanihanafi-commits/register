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
    }, 500);
  }

  if (!participant) {
    return <h2 style={{padding:40}}>Loading...</h2>;
  }

  return (
    // ...
  );
}
