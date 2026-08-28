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

    // IMPORTANT FOR EDGE
    params.set("action", action);
    params.set("authuser", "0");
    params.set("callback", callbackName);
    params.set("_", Date.now().toString());

    if (id) {
      params.set("id", String(id));
    }

    let finished = false;

    let timeout;


    // ========================================================
    // CLEANUP
    // ========================================================

    const cleanup = () => {

      clearTimeout(timeout);

      delete window[callbackName];

      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }

    };


    // ========================================================
    // SUCCESS CALLBACK
    // ========================================================

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


    // ========================================================
    // SCRIPT ERROR
    // ========================================================

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


    // ========================================================
    // TIMEOUT
    // ========================================================

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


    // ========================================================
    // FINAL URL
    // ========================================================

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
      await callGoogleScript(
        "list"
      );

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
      await callGoogleScript(
        "stats"
      );

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
// GENERATE ALL CERTIFICATES
// ============================================================

export async function generateCertificate(id) {

  try {

    return await callGoogleScript(
      "generateAllCertificatesForParticipant",
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

// ============================================================
// SEND ONE CERTIFICATE
// ============================================================

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
// SEND BADGE
// ============================================================

export async function sendBadgeEmail(id) {

  try {

    return await callGoogleScript(
      "sendBadgeEmail",
      id
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
// TEST GOOGLE SCRIPT
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
