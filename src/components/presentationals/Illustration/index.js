import React, { PureComponent } from "react"
import { Image, Dimensions } from "react-native"
import { wrap } from "react-native-style-tachyons"

class Illustration extends PureComponent {
  render() {
    const { src, margins } = this.props

    return (
      <Image
        style={{
          width: null,
          height: null,
          flex: 1,
        }}
        resizeMode="contain"
        source={src}
      />
    )
  }
}

export default Illustration
