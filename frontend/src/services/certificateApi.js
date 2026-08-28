const API_URL =
  "https://script.google.com/macros/s/AKfycbzxZ_D2fSo0JvRzJh-5N7cl7llz5sX3-fcLMsOUphON7_xFhsZm_qvKPIjlHhCsw9ts/exec";


// ============================================================
// GOOGLE APPS SCRIPT API CALL
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
    params.set("callback", callbackName);


    if (id) {
      params.set("id", String(id));
    }


    let finished = false;


    const cleanup = () => {

      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }

      try {
        delete window[callbackName];
      } catch (e) {
        window[callbackName] = undefined;
      }

    };


    const fail = (message) => {

      if (finished) return;

      finished = true;

      cleanup();

      reject(
        new Error(message)
      );

    };


    // JSONP callback
    window[callbackName] = (data) => {

      if (finished) return;

      finished = true;

      cleanup();

      resolve(data);

    };


    script.onerror = () => {

      fail(
        "Failed to connect to Google Apps Script"
      );

    };


    // Timeout after 20 seconds
    const timeout =
      setTimeout(() => {

        fail(
          "Google Apps Script request timed out"
        );

      }, 20000);


    // Make sure timeout is cleared
    const originalCallback =
      window[callbackName];


    window[callbackName] = (data) => {

      clearTimeout(timeout);

      if (finished) return;

      finished = true;

      cleanup();

      resolve(data);

    };


    script.src =
      API_URL +
      "?" +
      params.toString();


    script.async = true;


    document.head.appendChild(script);

  });

}


// ============================================================
// GET PARTICIPANTS
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

      message:
        error.message,

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

      message:
        error.message

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

      message:
        error.message

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

      message:
        error.message

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
      id
    );

  } catch (error) {

    console.error(
      "Generate Certificate Error:",
      error
    );


    return {

      success: false,

      message:
        error.message

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

      message:
        error.message

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

      message:
        error.message

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

      message:
        error.message

    };

  }

}
