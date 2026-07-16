const API_URL =
  "https://script.google.com/macros/s/AKfycbymfwC0xvRYxr_9T-25ih_fg7juZ_KjTWY4FElT6mTkT7WGMD5RQxtSBBYvyS4iDsIRcA/exec";

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
