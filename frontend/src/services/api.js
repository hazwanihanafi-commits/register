const API_URL =
  "https://script.google.com/macros/s/AKfycbzqZOqDtqxWhuAApLkYEOZEqIzBayyXjXh-isFC4P9uEJAVaN0PX7jNuiFkelaxLiyegQ/exec";

// Search participant
export async function getParticipant(id) {
  const response = await fetch(
    `${API_URL}?id=${encodeURIComponent(id)}`
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
    body: JSON.stringify({ id }),
  });

  return await response.json();
}
