import React from "react"
import { connect } from "react-redux"
import Screen from "./presentational"
import { actions as ProfilesActions } from "store/symbiotes/Profiles"
import { actions as InitializationActions } from "store/symbiotes/Initialization"

const mapStateToProps = (state) => ({
  translation: state.translation,
  humans: state.profiles.humans,
  animals: state.profiles.animals,
  currentAnimal: state.profiles.currentAnimal,
  currentHuman: state.profiles.currentHuman,
  isCheckInCompleted: state.initialization.checkInComplete,
})

const mapDispatchToProps = (dispatch) => ({
  setAsCurrentHuman: (payload) => dispatch(ProfilesActions.setCurrentHuman(payload)),
  setAsCurrentAnimal: (payload) => dispatch(ProfilesActions.setCurrentAnimal(payload)),
  addHumanProfile: (payload) => dispatch(ProfilesActions.addHuman(payload)),
  updateHumanProfile: (payload) => dispatch(ProfilesActions.updateHuman(payload)),
  removeHumanProfile: (payload) => dispatch(ProfilesActions.removeHuman(payload)),
  addAnimalProfile: (payload) => dispatch(ProfilesActions.addAnimal(payload)),
  updateAnimalProfile: (payload) => dispatch(ProfilesActions.updateAnimal(payload)),
  removeAnimalProfile: (payload) => dispatch(ProfilesActions.removeAnimal(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen)
