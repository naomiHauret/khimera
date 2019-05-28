import React from 'react'
import { connect } from 'react-redux'
import Screen from './presentational'

const mapStateToProps = (state) => ({
  translation: state.translation,
})

const mapDispatchToProps = (dispatch, props) => {
  return ({
    hideOnboarding: () => dispatch(InitializationActions.hideOnboarding()),
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen)