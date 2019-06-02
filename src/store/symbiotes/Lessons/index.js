import { createSymbiote } from "redux-symbiote"
import { addLesson } from "services/lessons"

const initialState = {
  freeLessonTaken: null,
}

const symbiotes = {
  // set free lesson
  takeFreeLesson: (state, payload) => {
    addLesson(payload)
    return {
      ...state,
      freeLessonTaken: payload,
    }
  },
}

export const { actions, reducer: lessonsReducer } = createSymbiote(initialState, symbiotes, "app/lessons")
