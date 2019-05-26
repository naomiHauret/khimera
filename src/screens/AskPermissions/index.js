import React from 'react'
import { connect } from 'react-redux'
import Screen from './presentational'
import { actions as InitializationActions } from 'store/symbiotes/Initialization'

const mapStateToProps = (state) => ({
  translation: state.translation,
  permissionsGranted: state.initialization.permissionsGranted
})

const mapDispatchToProps = (dispatch, props) => ({ })

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen)