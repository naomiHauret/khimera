import React from "react"
import { connect } from "react-redux"
import { actions as ProfilesActions } from "store/symbiotes/Profiles"
import { actions as LessonsActions } from "store/symbiotes/Lessons"
import { actions as ToastrActions } from "store/symbiotes/Toastr"

import Screen from "./presentational"

const mapStateToProps = (state) => ({
  translation: state.translation,
  freeLessonTaken: state.lessons.freeLessonTaken,
  currentAnimal: {
    id: state.profiles.currentAnimal,
    ...state.profiles.animals[state.profiles.currentAnimal]
  },
  currentHuman: {
    id: state.profiles.currentHuman,
    ...state.profiles.humans[state.profiles.currentHuman]
  },
})

const mapDispatchToProps = (dispatch, props) => {
  return {
    updateHumanMood: (payload) => dispatch(ProfilesActions.updateHumanMood(payload)),
    updateAnimalMood: (payload) => dispatch(ProfilesActions.updateAnimalMood(payload)),
    addToast: (payload) => dispatch(ToastrActions.add(payload)),
    takeFreeLesson: (payload) => dispatch(LessonsActions.addLesson(payload)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen)
