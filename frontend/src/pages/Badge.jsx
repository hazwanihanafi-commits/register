import { useParams } from "react-router-dom";

export default function Badge() {

  const { id } = useParams();

  return (
    <div style={{ padding: 40 }}>
      <h1>Participant Badge</h1>
      <h2>{id}</h2>
    </div>
  );

}
