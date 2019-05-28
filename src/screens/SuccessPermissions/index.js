import React from "react"
import { connect } from "react-redux"
import Screen from "./presentational"
import { actions as InitializationActions } from "store/symbiotes/Initialization"

const mapStateToProps = (state) => ({
  translation: state.translation,
  checkInComplete: state.initialization.checkInComplete,
})

const mapDispatchToProps = (dispatch, props) => ({
  grantPermissisons: () => dispatch(InitializationActions.grantPermissisons()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen)
