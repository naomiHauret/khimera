import React, { PureComponent } from 'react'
import Navigator from 'navigator'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({ })

const mapDispatchToProps = (dispatch, props) => {
  return ({ })
}

class AppNavigator extends PureComponent {
  render() {
    return (
      <Navigator />
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppNavigator)