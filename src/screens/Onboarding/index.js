import React from "react"
import { connect } from "react-redux"
import Screen from "./presentational"
import { actions as InitializationActions } from "store/symbiotes/Initialization"

const mapStateToProps = (state) => ({
  translation: state.translation,
  showOnboarding: state.initialization.showOnboarding,
})

const mapDispatchToProps = (dispatch, props) => {
  return {
    hideOnboarding: () => dispatch(InitializationActions.hideOnboarding()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen)
