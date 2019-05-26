import React from 'react'
import { connect } from 'react-redux'
import Screen from './presentational'
import { actions as InitializationActions } from 'store/symbiotes/Initialization'

const mapStateToProps = (state) => ({
  translation: state.translation,
  paired: state.initialization.paired,
})

const mapDispatchToProps = (dispatch, props) => {
  return ({
    pairingDone: () => dispatch(InitializationActions.pairingDone()),
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen)
