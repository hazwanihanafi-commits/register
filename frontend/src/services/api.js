const API_URL =
  "https://script.google.com/macros/s/AKfycbzxZ_D2fSo0JvRzJh-5N7cl7llz5sX3-fcLMsOUphON7_xFhsZm_qvKPIjlHhCsw9ts/exec";


// ======================================
// JSONP REQUEST
// ======================================

function callGoogleScript(action, params = {}) {

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

    const query =
      new URLSearchParams();

    query.set("action", action);
query.set("callback", callbackName);
query.set("authuser", "0");

    Object.entries(params).forEach(
      ([key, value]) => {

        if (
          value !== undefined &&
          value !== null
        ) {

          query.set(
            key,
            String(value)
          );

        }

      }
    );

    let timeout;

    const cleanup = () => {

      clearTimeout(timeout);

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

    timeout = setTimeout(() => {

      cleanup();

      reject(
        new Error(
          "Google Apps Script request timed out"
        )
      );

    }, 60000);

    script.src =
      `${API_URL}?${query.toString()}`;

    document.body.appendChild(script);

  });

}


// ======================================
// DASHBOARD SUMMARY
// ======================================

export async function getSummary() {

  try {

    return await callGoogleScript(
      "stats"
    );

  } catch (error) {

    console.error(
      "Dashboard Error:",
      error
    );

    return {
      success: false,
      message: error.message
    };

  }

}


// ======================================
// GET ALL PARTICIPANTS
// ======================================

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
      message: error.message
    };

  }

}


// ======================================
// GET ONE PARTICIPANT
// ======================================

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


// ======================================
// CHECK IN
// ======================================

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
      "Check In Error:",
      error
    );

    return {
      success: false,
      message: error.message
    };

  }

}


// ======================================
// SEND BADGE EMAIL
// ======================================

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
      "Badge Email Error:",
      error
    );

    return {
      success: false,
      message: error.message
    };

  }

}


// ======================================
// GENERATE CERTIFICATE
// ======================================

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


// ======================================
// SEND ONE CERTIFICATE EMAIL
// ======================================

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


// ======================================
// SEND ALL CERTIFICATE EMAILS
// ======================================
//
// This sends one request per participant.
// It does NOT call the Apps Script
// sendAllCertificateEmails endpoint.
//
// This avoids one very long Apps Script
// request and reduces timeout problems.
//

export async function sendAllCertificateEmails(
  participants,
  onProgress
) {

  const results = [];

  let sent = 0;
  let skipped = 0;
  let failed = 0;

  for (
    let i = 0;
    i < participants.length;
    i++
  ) {

    const participant =
      participants[i];

    const id =
      String(
        participant.id ?? ""
      ).trim();

    const name =
      String(
        participant.name ?? ""
      ).trim();

    const email =
      String(
        participant.email ?? ""
      ).trim();


    // ==================================
    // NO ID
    // ==================================

    if (!id) {

      skipped++;

      results.push({
        id,
        name,
        status: "No ID"
      });

      continue;

    }


    // ==================================
    // NO EMAIL
    // ==================================

    if (!email) {

      skipped++;

      results.push({
        id,
        name,
        status: "No email"
      });

      continue;

    }


    // ==================================
    // ALREADY SENT
    // ==================================

    const emailSent =
      String(
        participant.emailSent ?? ""
      )
        .trim()
        .toLowerCase();

    if (
      emailSent === "yes" ||
      emailSent === "sent"
    ) {

      skipped++;

      results.push({
        id,
        name,
        email,
        status: "Already sent"
      });

      continue;

    }


    // ==================================
    // SEND CERTIFICATE
    // ==================================

    try {

      const result =
        await sendCertificate(id);

      if (result && result.success) {

        sent++;

        results.push({
          id,
          name,
          email,
          status: "Sent"
        });

      } else {

        failed++;

        results.push({
          id,
          name,
          email,
          status:
            "Failed: " +
            (
              result?.message ||
              "Unknown error"
            )
        });

      }

    } catch (error) {

      failed++;

      results.push({
        id,
        name,
        email,
        status:
          "Failed: " +
          error.message
      });

    }


    // ==================================
    // PROGRESS
    // ==================================

    if (onProgress) {

      onProgress({
        current: i + 1,
        total: participants.length,
        sent,
        skipped,
        failed,
        results
      });

    }


    // ==================================
    // SMALL DELAY
    // ==================================

    await new Promise(
      resolve =>
        setTimeout(
          resolve,
          500
        )
    );

  }


  return {

    success: true,

    message:
      "Certificate email process completed.",

    sent,
    skipped,
    failed,

    results

  };

}
