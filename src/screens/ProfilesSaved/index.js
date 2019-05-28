import React from "react"
import { connect } from "react-redux"
import { actions as InitializationActions } from "store/symbiotes/Initialization"
import Screen from "./presentational"

const mapStateToProps = (state) => ({
  translation: state.translation,
  isCheckInCompleted: state.initialization.checkInComplete,
})

const mapDispatchToProps = (dispatch, props) => ({
  completeCheckIn: () => dispatch(InitializationActions.completeCheckIn()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen)
