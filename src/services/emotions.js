import { API_URL } from "utils/config"

export const addEmotion = (payload) => {
  fetch(`${API_URL}/emotion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid: payload }),
  })
}
