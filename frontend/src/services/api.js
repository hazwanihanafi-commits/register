const API_URL =
  "https://script.google.com/macros/s/AKfycbwL0N7FbMP7yoUKQ6FgrTPzIHrKesDkoD_EdIBL80xoaR0SH5Uos2CrUOg5kFtTAXiPUw/exec";

// ==============================
// Helper Function
// ==============================
async function fetchAPI(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();

  } catch (error) {

    console.error("API Error:", error);

    return {
      success: false,
      message: error.message
    };
  }
}

// ==============================
// Dashboard Summary
// ==============================
export async function getSummary() {

  return fetchAPI(
    `${API_URL}?action=stats`
  );

}

// ==============================
// List Participants
// ==============================
export async function getParticipants() {

  return fetchAPI(
    `${API_URL}?action=list`
  );

}

// ==============================
// Search Participant
// ==============================
export async function getParticipant(id) {

  const value = String(id ?? "").trim();

  return fetchAPI(
    `${API_URL}?id=${encodeURIComponent(value)}`
  );

}

// ==============================
// Check In
// ==============================
export async function checkIn(id) {

  const value = String(id ?? "").trim();

  return fetchAPI(
    `${API_URL}?action=checkin&id=${encodeURIComponent(value)}`
  );

}
