const API_URL =
  "https://script.google.com/macros/s/AKfycbw1ffyfvlp-NrZUO7IJyfpc23Goaod4SCwJKRIUg2jWC2uKK_cuLoEa7ZyATkC1cf5XFA/exec";

// Search participant
export async function getParticipant(id) {
  const response = await fetch(`${API_URL}?id=${encodeURIComponent(id)}`);
  return await response.json();
}

// Check-in participant
export async function checkIn(id) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  return await response.json();
}
