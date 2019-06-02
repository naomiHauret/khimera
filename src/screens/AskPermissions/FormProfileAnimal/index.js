import React from "react"
import { connect } from "react-redux"
import Screen from "./presentational"
import { actions as ProfilesActions } from "store/symbiotes/Profiles"
import { actions as FormsActions } from "store/symbiotes/Forms"

const mapStateToProps = (state) => ({
  translation: state.translation,
  formData: state.forms.formAnimal,
  checkInComplete: state.initialization.checkInComplete,
  isAnimalProfileAlreadyRegistered: Object.keys(state.profiles.animals).length >= 1,
})

const mapDispatchToProps = (dispatch, props) => {
  return {
    setAsCurrent: (payload) => dispatch(ProfilesActions.setCurrentAnimal(payload)),
    setName: (payload) => dispatch(FormsActions.setAnimalName(payload)),
    setPicture: (payload) => dispatch(FormsActions.setAnimalPicture(payload)),
    addProfile: (payload) => dispatch(ProfilesActions.addAnimal(payload)),
    updateProfile: (payload) => dispatch(ProfilesActions.updateAnimal(payload)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen)
