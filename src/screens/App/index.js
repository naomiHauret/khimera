import React from 'react'
import { connect } from 'react-redux'
import Screen from './presentational'
import { actions as ToastrActions } from 'store/symbiotes/Toastr'
import { actions as InitializationActions } from 'store/symbiotes/Initialization'

const mapStateToProps = (state) => ({
  checkInComplete: state.initialization.checkInComplete,
  toastrs: state.toastr.list,
  showOnboarding: state.initialization.showOnboarding,
  paired: state.initialization.paired,
})

const mapDispatchToProps = (dispatch, props) => {
  return ({
    removeToast: (payload) => dispatch(ToastrActions.remove(payload)),
    hideOnboarding: () => dispatch(InitializationActions.hideOnboarding()),
    pairingDone: () => dispatch(InitializationActions.pairingDone()),
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen)
