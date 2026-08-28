const API_URL =
  "https://script.google.com/macros/s/AKfycbzxZ_D2fSo0JvRzJh-5N7cl7llz5sX3-fcLMsOUphON7_xFhsZm_qvKPIjlHhCsw9ts/exec";


// ============================================================
// GOOGLE APPS SCRIPT REQUEST
// ============================================================

async function callGoogleScript(action, params = {}) {

  const query =
    new URLSearchParams();

  query.set("action", action);
  query.set("authuser", "0");
  query.set("_", Date.now().toString());

  Object.entries(params).forEach(
    ([key, value]) => {

      if (
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {

        query.set(
          key,
          String(value)
        );

      }

    }
  );

  const url =
    `${API_URL}?${query.toString()}`;

  console.log(
    "GOOGLE SCRIPT REQUEST:",
    url
  );

  const response =
    await fetch(url, {
      method: "GET",
      redirect: "follow",
    });

  console.log(
    "GOOGLE SCRIPT STATUS:",
    response.status
  );

  const text =
    await response.text();

  console.log(
    "GOOGLE SCRIPT RESPONSE:",
    text
  );

  try {

    return JSON.parse(text);

  } catch (error) {

    throw new Error(
      "Google Apps Script returned invalid JSON: " +
      text.substring(0, 300)
    );

  }

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
