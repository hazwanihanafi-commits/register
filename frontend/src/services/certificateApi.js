const API_URL =
  "https://script.google.com/macros/s/AKfycbwL0N7FbMP7yoUKQ6FgrTPzIHrKesDkoD_EdIBL80xoaR0SH5Uos2CrUOg5kFtTAXiPUw/exec";

export async function generateCertificate(id) {

  const response = await fetch(
    `${API_URL}?action=generateCertificate&id=${id}`
  );

  return await response.json();

}

export async function sendCertificate(id) {

  const response = await fetch(
    `${API_URL}?action=sendCertificateEmail&id=${id}`
  );

  return await response.json();

}
