const API_URL =
  "https://script.google.com/macros/s/AKfycbxaZo7TLncSnL48b7Au-HxWhNjRd3UZIaaK2JIvkL1nfhAtIPHzvPcEpwr0XBfG-dpDQQ/exec";

export async function getParticipant(id) {
  const response = await fetch(
    `${API_URL}?id=${encodeURIComponent(id)}`
  );

  return await response.json();
}

export async function checkIn(id) {

  const response = await fetch(
    `${API_URL}?action=checkin&id=${encodeURIComponent(id)}`
  );

  return await response.json();

}
