const API_URL =
  "https://script.google.com/macros/s/AKfycbwL0N7FbMP7yoUKQ6FgrTPzIHrKesDkoD_EdIBL80xoaR0SH5Uos2CrUOg5kFtTAXiPUw/exec";


// =======================================
// JSONP HELPER
// =======================================

function callGoogleScript(action, id = "") {

  return new Promise((resolve, reject) => {

    const callbackName =
      "googleScriptCallback_" +
      Date.now() +
      "_" +
      Math.random()
        .toString(36)
        .substring(2);

    const script =
      document.createElement("script");

    const params = new URLSearchParams();

    params.set("action", action);
    params.set("callback", callbackName);

    if (id) {
      params.set("id", String(id));
    }

    const cleanup = () => {

      delete window[callbackName];

      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }

    };

    window[callbackName] = (data) => {

      cleanup();

      resolve(data);

    };

    script.onerror = () => {

      cleanup();

      reject(
        new Error(
          "Failed to connect to Google Apps Script"
        )
      );

    };

    script.src =
      `${API_URL}?${params.toString()}`;

    document.body.appendChild(script);

  });

}


// =======================================
// GENERATE CERTIFICATE
// =======================================

export async function generateCertificate(id) {

  try {

    return await callGoogleScript(
      "generateCertificate",
      id
    );

  } catch (error) {

    console.error(
      "Generate Certificate Error:",
      error
    );

    return {
      success: false,
      message: error.message
    };

  }

}


// =======================================
// SEND CERTIFICATE EMAIL
// =======================================

export async function sendCertificate(id) {

  try {

    return await callGoogleScript(
      "sendCertificateEmail",
      id
    );

  } catch (error) {

    console.error(
      "Send Certificate Error:",
      error
    );

    return {
      success: false,
      message: error.message
    };

  }

}


// =======================================
// SEND ALL CERTIFICATE EMAILS
// =======================================

export async function sendAllCertificateEmails() {

  try {

    return await callGoogleScript(
      "sendAllCertificateEmails"
    );

  } catch (error) {

    console.error(
      "Send All Certificate Error:",
      error
    );

    return {
      success: false,
      message: error.message
    };

  }

}
