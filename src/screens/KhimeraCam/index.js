import React from "react"
import { connect } from "react-redux"
import { actions as ProfilesActions } from "store/symbiotes/Profiles"
import { actions as LessonsActions } from "store/symbiotes/Lessons"
import { actions as ToastrActions } from "store/symbiotes/Toastr"
import { actions as TranslationActions } from "store/symbiotes/Translation"

import Screen from "./presentational"

const mapStateToProps = (state) => ({
  translation: state.translation,
  freeLessonTaken: state.lessons.freeLessonTaken,
  currentAnimal: {
    id: state.profiles.currentAnimal,
    ...state.profiles.animals[state.profiles.currentAnimal],
  },
  currentHuman: {
    id: state.profiles.currentHuman,
    ...state.profiles.humans[state.profiles.currentHuman],
  },
})

const mapDispatchToProps = (dispatch, props) => {
  return {
    updateAnimalMood: (payload) => dispatch(ProfilesActions.updateAnimalMood(payload)),
    updateHumanMood: (payload) => dispatch(ProfilesActions.updateHumanMood(payload)),
    addToast: (payload) => dispatch(ToastrActions.add(payload)),
    takeFreeLesson: (payload) => dispatch(LessonsActions.takeFreeLesson(payload)),
    changeLocale: (payload) => dispatch(TranslationActions.changeLocale(payload)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen)
