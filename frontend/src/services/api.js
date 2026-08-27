const API_URL =
  "https://script.google.com/macros/s/AKfycbzxZ_D2fSo0JvRzJh-5N7cl7llz5sX3-fcLMsOUphON7_xFhsZm_qvKPIjlHhCsw9ts/exec";

// ======================================
// JSONP REQUEST
// ======================================

function callGoogleScript(
  action,
  id = ""
) {

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


    params.set(
      "action",
      action
    );


    params.set(
      "callback",
      callbackName
    );


    if (
      id !== undefined &&
      id !== null &&
      String(id).trim() !== ""
    ) {

      params.set(
        "id",
        String(id).trim()
      );

    }


    let timeout;


    const cleanup = () => {

      clearTimeout(timeout);


      delete window[
        callbackName
      ];


      if (script.parentNode) {

        script.parentNode.removeChild(
          script
        );

      }

    };


    window[
      callbackName
    ] = (data) => {

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
      `${API_URL}?${params.toString()}`;


    document.body.appendChild(
      script
    );

  });

}


// ======================================
// GENERATE CERTIFICATE
// ======================================

export async function generateCertificate(id) {

  try {

    const result =
      await callGoogleScript(
        "generateCertificate",
        id
      );

    console.log(
      "Generate Certificate:",
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


// ======================================
// SEND ONE CERTIFICATE
// ======================================

export async function sendCertificate(id) {

  try {

    const result =
      await callGoogleScript(
        "sendCertificateEmail",
        id
      );

    console.log(
      "Send Certificate:",
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


// ======================================
// SEND ALL CERTIFICATES
// ======================================

export async function sendAllCertificateEmails() {

  try {

    const result =
      await callGoogleScript(
        "sendAllCertificateEmails"
      );

    console.log(
      "Send All Certificates:",
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
