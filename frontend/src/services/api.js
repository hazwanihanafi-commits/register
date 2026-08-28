const API_URL =
  "https://script.google.com/macros/s/AKfycbzxZ_D2fSo0JvRzJh-5N7cl7llz5sX3-fcLMsOUphON7_xFhsZm_qvKPIjlHhCsw9ts/exec";


// ============================================================
// GOOGLE APPS SCRIPT JSONP API
// ============================================================

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

    // IMPORTANT
    query.set("action", action);
    query.set("authuser", "0");
    query.set("callback", callbackName);
    query.set("_", Date.now().toString());

    // Additional parameters
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

    let timeout;

    let finished = false;


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
        "Google Apps Script response:",
        data
      );

      cleanup();

      resolve(data);

    };


    // ========================================================
    // ERROR
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

    timeout = setTimeout(() => {

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
    // FINAL REQUEST
    // ========================================================

    script.src =
      `${API_URL}?${query.toString()}`;

    console.log(
      "Google Apps Script request:",
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
// GET DASHBOARD STATS
// ============================================================

export async function getStats() {

  try {

    const result =
      await callGoogleScript(
        "stats"
      );

    console.log(
      "DASHBOARD STATS:",
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
      "get",
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
// SEND BADGE EMAIL
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
// SEND ONE CERTIFICATE EMAIL
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
// SEND ALL CERTIFICATE EMAILS
// ============================================================

export async function sendAllCertificateEmails(
  participants = [],
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
        participant?.id ?? ""
      ).trim();

    const name =
      String(
        participant?.name ?? ""
      ).trim();

    const email =
      String(
        participant?.email ?? ""
      ).trim();


    // --------------------------------------------------------
    // NO ID
    // --------------------------------------------------------

    if (!id) {

      skipped++;

      results.push({
        id,
        name,
        email,
        status: "No ID"
      });

      continue;

    }


    // --------------------------------------------------------
    // NO EMAIL
    // --------------------------------------------------------

    if (!email) {

      skipped++;

      results.push({
        id,
        name,
        email,
        status: "No email"
      });

      continue;

    }


    // --------------------------------------------------------
    // ALREADY SENT
    // --------------------------------------------------------

    const emailSent =
      String(
        participant?.emailSent ?? ""
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


    // --------------------------------------------------------
    // SEND
    // --------------------------------------------------------

    try {

      const result =
        await sendCertificate(id);


      if (
        result &&
        result.success
      ) {

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


    // --------------------------------------------------------
    // PROGRESS
    // --------------------------------------------------------

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


    // --------------------------------------------------------
    // DELAY
    // --------------------------------------------------------

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


// ============================================================
// TEST API
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
