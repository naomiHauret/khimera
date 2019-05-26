import React, { PureComponent } from 'react'
import Text from 'components/presentationals/Text'

class Heading extends PureComponent {
  render() {
    const {margins} = this.props
    return <Text type="bold" additionalStyles={`f6 yellow-600 ${margins ? margins : ""}`} >
      {this.props.children}
    </Text>
  }
}

export default Heading