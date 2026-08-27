const API_URL =
  "https://script.google.com/macros/s/AKfycbwL0N7FbMP7yoUKQ6FgrTPzIHrKesDkoD_EdIBL80xoaR0SH5Uos2CrUOg5kFtTAXiPUw/exec";


// ==============================
// JSONP Helper
// ==============================

function callGoogleScript(action = "", params = {}) {

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

    // Action
    if (action) {
      query.set("action", action);
    }

    // JSONP callback
    query.set(
      "callback",
      callbackName
    );

    // Other parameters
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


    // ==========================
    // Cleanup
    // ==========================

    const cleanup = () => {

      delete window[
        callbackName
      ];

      if (
        script.parentNode
      ) {

        script.parentNode.removeChild(
          script
        );

      }

    };


    // ==========================
    // Success
    // ==========================

    window[
      callbackName
    ] = (data) => {

      cleanup();

      resolve(data);

    };


    // ==========================
    // Error
    // ==========================

    script.onerror = () => {

      cleanup();

      console.error(
        "Google Apps Script API Error:",
        action
      );

      reject(
        new Error(
          "Failed to connect to Google Apps Script"
        )
      );

    };


    // ==========================
    // Create JSONP request
    // ==========================

    script.src =
      `${API_URL}?${query.toString()}`;


    document.body.appendChild(
      script
    );

  });

}


// ==============================
// Dashboard Summary
// ==============================

export async function getSummary() {

  try {

    return await callGoogleScript(
      "stats"
    );

  } catch (error) {

    console.error(
      "Summary API Error:",
      error
    );

    return {
      success: false,
      message: error.message
    };

  }

}


// ==============================
// List Participants
// ==============================

export async function getParticipants() {

  try {

    return await callGoogleScript(
      "list"
    );

  } catch (error) {

    console.error(
      "Participants API Error:",
      error
    );

    return {
      success: false,
      message: error.message
    };

  }

}


// ==============================
// Search Participant
// ==============================

export async function getParticipant(id) {

  try {

    const value =
      String(id ?? "").trim();


    return await callGoogleScript(
      "",
      {
        id: value
      }
    );

  } catch (error) {

    console.error(
      "Participant Search Error:",
      error
    );

    return {
      success: false,
      message: error.message
    };

  }

}


// ==============================
// Check In
// ==============================

export async function checkIn(id) {

  try {

    const value =
      String(id ?? "").trim();


    return await callGoogleScript(
      "checkin",
      {
        id: value
      }
    );

  } catch (error) {

    console.error(
      "Check In API Error:",
      error
    );

    return {
      success: false,
      message: error.message
    };

  }

}


// ==============================
// Send Badge Email
// ==============================

export async function sendBadgeEmail(id) {

  try {

    const value =
      String(id ?? "").trim();


    return await callGoogleScript(
      "sendBadgeEmail",
      {
        id: value
      }
    );

  } catch (error) {

    console.error(
      "Badge Email API Error:",
      error
    );

    return {
      success: false,
      message: error.message
    };

  }

}
