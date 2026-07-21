const API_URL =
  "https://script.google.com/macros/s/AKfycbwL0N7FbMP7yoUKQ6FgrTPzIHrKesDkoD_EdIBL80xoaR0SH5Uos2CrUOg5kFtTAXiPUw/exec";

export async function generateCertificate(id) {

  const formData = new FormData();

  formData.append("action", "generateCertificate");
  formData.append("id", id);

  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  return await response.json();
}

export async function sendCertificate(id) {

  const formData = new FormData();

  formData.append("action", "sendCertificateEmail");
  formData.append("id", id);

  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  return await response.json();
}
