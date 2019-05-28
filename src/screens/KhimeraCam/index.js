import React from "react"
import { connect } from "react-redux"
import { actions as ProfilesActions } from "store/symbiotes/Profiles"

import Screen from "./presentational"

const mapStateToProps = (state) => ({
  translation: state.translation,
  currentAnimal: state.profiles.animals[state.profiles.currentAnimal],
  currentHuman: state.profiles.humans[state.profiles.currentHuman],
})

const mapDispatchToProps = (dispatch, props) => {
  return {
    updateHumanMood: (payload) => dispatch(ProfilesActions.updateHumanMood(payload)),
    updateAnimalMood: (payload) => dispatch(ProfilesActions.updateAnimalMood(payload)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen)
