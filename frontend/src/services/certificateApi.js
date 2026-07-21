const API_URL =
  "https://script.google.com/macros/s/AKfycbwL0N7FbMP7yoUKQ6FgrTPzIHrKesDkoD_EdIBL80xoaR0SH5Uos2CrUOg5kFtTAXiPUw/exec";

// Generate Certificate
export async function generateCertificate(id) {

  const response = await fetch(API_URL, {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      action: "generateCertificate",
      id: id,
    }),

  });

  return await response.json();

}

// Send Certificate Email
export async function sendCertificate(id) {

  const response = await fetch(API_URL, {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      action: "sendCertificateEmail",
      id: id,
    }),

  });

  return await response.json();

}
