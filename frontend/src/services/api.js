const API_URL =
  "https://script.google.com/macros/s/AKfycbxaZo7TLncSnL48b7Au-HxWhNjRd3UZIaaK2JIvkL1nfhAtIPHzvPcEpwr0XBfG-dpDQQ/exec";

// Dashboard Summary
export async function getSummary() {
  const response = await fetch(`${API_URL}?action=summary`);
  return await response.json();
}

// List All Participants
export async function getParticipants() {
  const response = await fetch(`${API_URL}?action=list`);
  return await response.json();
}

// Search Participant
export async function getParticipant(id) {
  const response = await fetch(
    `${API_URL}?id=${encodeURIComponent(id.trim())}`
  );

  return await response.json();
}

// Check In
export async function checkIn(id) {
  const response = await fetch(
    `${API_URL}?action=checkin&id=${encodeURIComponent(id.trim())}`
  );

  return await response.json();
}
