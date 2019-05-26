import React from 'react'
import { connect } from 'react-redux'
import Screen from './presentational'

const mapStateToProps = (state) => ({
  translation: state.translation,
  checkInComplete: state.initialization.checkInComplete,

})

const mapDispatchToProps = (dispatch, props) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen)