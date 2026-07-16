const API_URL =
  "https://script.google.com/macros/s/AKfycbxdSRGkS1iyWCFZZUvSpmg6z8L2IsxwYEl9AQof4qxtF8mmJU2KEmVXSWJlvh1vS_7Fcg/exec";

// Search participant
export async function getParticipant(id) {
  const response = await fetch(
    `${API_URL}?id=${encodeURIComponent(id.trim())}`
  );

  return await response.json();
}

// Check-in participant
export async function checkIn(id) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id.trim(),
    }),
  });

  return await response.json();
}
