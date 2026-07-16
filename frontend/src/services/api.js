const API_URL =
  "https://script.google.com/macros/s/AKfycbw1ffyfvlp-NrZUO7IJyfpc23Goaod4SCwJKRIUg2jWC2uKK_cuLoEa7ZyATkC1cf5XFA/exec";

export async function getParticipant(id) {
  try {
    const response = await fetch(`${API_URL}?id=${id}`);

    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);

    return {
      success: false,
    };
  }
}
