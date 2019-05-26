import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import Screen from './presentational'
import { actions as ProfilesActions } from 'store/symbiotes/Profiles'
import { actions as FormsActions } from 'store/symbiotes/Forms'

const mapStateToProps = (state) => ({
  translation: state.translation,
  checkInComplete: state.initialization.checkInComplete,
  formData: state.forms.formHuman,
})

const mapDispatchToProps = (dispatch) => ({
  setAsCurrent: (payload) => dispatch(ProfilesActions.setCurrentHuman(payload)),
  setName: (payload) => dispatch(FormsActions.setHumanName(payload)),
  setPicture: (payload) => dispatch(FormsActions.setHumanPicture(payload)),
  addProfile: (payload) => dispatch(ProfilesActions.addHuman(payload)),
  updateProfile: (payload) => dispatch(ProfilesActions.updateHuman(payload)),
})

const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen)

const formed = reduxForm({ form: 'profileHuman' })(connected)

export default formed
