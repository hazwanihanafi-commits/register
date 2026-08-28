const API_URL =
  "https://script.google.com/macros/s/AKfycbzxZ_D2fSo0JvRzJh-5N7cl7llz5sX3-fcLMsOUphON7_xFhsZm_qvKPIjlHhCsw9ts/exec";


// ============================================================
// GOOGLE APPS SCRIPT REQUEST
// ============================================================

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

    const params =
      new URLSearchParams();

    // IMPORTANT
    params.set("action", action);
    params.set("authuser", "0");
    params.set("callback", callbackName);
    params.set("_", Date.now());

    if (id) {
      params.set("id", String(id));
    }

    let finished = false;

    let timeout;

    const cleanup = () => {

      clearTimeout(timeout);

      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }

      try {
        delete window[callbackName];
      } catch (e) {
        window[callbackName] = undefined;
      }

    };

    const finish = (data) => {

      if (finished) return;

      finished = true;

      cleanup();

      resolve(data);

    };

    const fail = (message) => {

      if (finished) return;

      finished = true;

      cleanup();

      reject(
        new Error(message)
      );

    };

    window[callbackName] = finish;

    script.onerror = () => {

      fail(
        "Failed to connect to Google Apps Script"
      );

    };

    timeout = setTimeout(() => {

      fail(
        "Google Apps Script request timed out"
      );

    }, 60000);

    script.async = true;

    script.src =
      `${API_URL}?${params.toString()}`;

    console.log(
      "Google Apps Script URL:",
      script.src
    );

    document.head.appendChild(script);

  });

}


// ============================================================
// GET PARTICIPANTS
// ============================================================

export async function getParticipants() {

  try {

    return await callGoogleScript(
      "list"
    );

  } catch (error) {

    console.error(
      "Participants Error:",
      error
    );

    return {
      success: false,
      message: error.message,
      participants: []
    };

  }

}


// ============================================================
// GET STATS
// ============================================================

export async function getStats() {

  try {

    return await callGoogleScript(
      "stats"
    );

  } catch (error) {

    console.error(
      "Stats Error:",
      error
    );

    return {
      success: false,
      message: error.message
    };

  }

}


// ============================================================
// GET ONE PARTICIPANT
// ============================================================

export async function getParticipant(id) {

  try {

    return await callGoogleScript(
      "",
      {
        id: String(id ?? "").trim()
      }
    );

  } catch (error) {

    console.error(
      "Participant Error:",
      error
    );

    return {
      success: false,
      message: error.message
    };

  }

}


// ============================================================
// CHECK-IN
// ============================================================

export async function checkIn(id) {

  try {

    return await callGoogleScript(
      "checkin",
      {
        id: String(id ?? "").trim()
      }
    );

  } catch (error) {

    console.error(
      "Check-in Error:",
      error
    );

    return {
      success: false,
      message: error.message
    };

  }

}


// ============================================================
// SEND BADGE
// ============================================================

export async function sendBadgeEmail(id) {

  try {

    return await callGoogleScript(
      "sendBadgeEmail",
      {
        id: String(id ?? "").trim()
      }
    );

  } catch (error) {

    console.error(
      "Send Badge Error:",
      error
    );

    return {
      success: false,
      message: error.message
    };

  }

}


// ============================================================
// GENERATE CERTIFICATE
// ============================================================

export async function generateCertificate(id) {

  try {

    return await callGoogleScript(
      "generateCertificate",
      {
        id: String(id ?? "").trim()
      }
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


// ============================================================
// SEND CERTIFICATE
// ============================================================

export async function sendCertificate(id) {

  try {

    return await callGoogleScript(
      "sendCertificateEmail",
      {
        id: String(id ?? "").trim()
      }
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


// ============================================================
// SEND ALL CERTIFICATES
// ============================================================

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


// ============================================================
// TEST
// ============================================================

export async function testGoogleScript() {

  try {

    return await callGoogleScript(
      "test"
    );

  } catch (error) {

    console.error(
      "Google Script Test Error:",
      error
    );

    return {
      success: false,
      message: error.message
    };

  }

}
