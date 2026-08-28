const API_URL =
  "https://script.google.com/macros/s/AKfycbzxZ_D2fSo0JvRzJh-5N7cl7llz5sX3-fcLMsOUphON7_xFhsZm_qvKPIjlHhCsw9ts/exec";


// ============================================================
// GOOGLE APPS SCRIPT JSONP API CALL
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

    params.set("action", action);
    params.set("authuser", "0");
    params.set("callback", callbackName);
    params.set("_", Date.now().toString());

    if (id) {
      params.set("id", String(id));
    }

    let finished = false;
    let timeout;

    const cleanup = () => {

      clearTimeout(timeout);

      delete window[callbackName];

      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }

    };

    window[callbackName] = (data) => {

      if (finished) return;

      finished = true;

      console.log(
        "GOOGLE SCRIPT RESPONSE:",
        data
      );

      cleanup();

      resolve(data);

    };

    script.onerror = () => {

      if (finished) return;

      finished = true;

      cleanup();

      reject(
        new Error(
          "Failed to connect to Google Apps Script"
        )
      );

    };

    timeout =
      setTimeout(() => {

        if (finished) return;

        finished = true;

        cleanup();

        reject(
          new Error(
            "Google Apps Script request timed out"
          )
        );

      }, 60000);

    script.src =
      `${API_URL}?${params.toString()}`;

    console.log(
      "GOOGLE SCRIPT REQUEST:",
      script.src
    );

    script.async = true;

    document.head.appendChild(script);

  });

}


// ============================================================
// GET ALL PARTICIPANTS
// ============================================================

export async function getParticipants() {

  try {

    const result =
      await callGoogleScript("list");

    console.log(
      "PARTICIPANTS FROM SHEET:",
      result
    );

    return result;

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

    const result =
      await callGoogleScript("stats");

    console.log(
      "STATS:",
      result
    );

    return result;

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
      id
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
      id
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
// GENERATE ALL CERTIFICATES FOR ONE PARTICIPANT
// ============================================================
// IMPORTANT:
// This calls the Apps Script function:
// generateAllCertificatesForParticipant
//
// Example:
// ST176 → Invited Speaker
// ST000 → Oral Presentation – First Place
// A participant with multiple categories → all applicable PDFs
// ============================================================

export async function generateCertificate(id) {

  try {

    const result =
      await callGoogleScript(
        "generateAllCertificatesForParticipant",
        id
      );

    console.log(
      "ALL CERTIFICATES GENERATED:",
      result
    );

    return result;

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
// SEND ONE CERTIFICATE EMAIL
// ============================================================

export async function sendCertificate(id) {

  try {

    const result =
      await callGoogleScript(
        "sendCertificateEmail",
        id
      );

    console.log(
      "CERTIFICATE EMAIL:",
      result
    );

    return result;

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
// SEND ALL CERTIFICATE EMAILS
// ============================================================

export async function sendAllCertificateEmails() {

  try {

    const result =
      await callGoogleScript(
        "sendAllCertificateEmails"
      );

    console.log(
      "ALL CERTIFICATE EMAILS:",
      result
    );

    return result;

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
// SEND BADGE EMAIL
// ============================================================

export async function sendBadgeEmail(id) {

  try {

    const result =
      await callGoogleScript(
        "sendBadgeEmail",
        id
      );

    console.log(
      "BADGE EMAIL:",
      result
    );

    return result;

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
// TEST GOOGLE SCRIPT
// ============================================================

export async function testGoogleScript() {

  try {

    const result =
      await callGoogleScript("test");

    console.log(
      "GOOGLE SCRIPT TEST:",
      result
    );

    return result;

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
