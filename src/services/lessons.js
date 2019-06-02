import { API_URL } from "utils/config"

export const addLesson = (payload) => {
  fetch(`${API_URL}/lesson`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid: payload }),
  })
}
