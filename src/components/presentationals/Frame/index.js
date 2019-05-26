import React, { PureComponent } from 'react'
import { View } from 'react-native'
import Text from 'components/presentationals/Text'
import Body from 'components/presentationals/Body'
import { wrap } from "react-native-style-tachyons"

const themeSystem = {
  backgrounds: {
    clear: 'bg-white',
    colorful: 'bg-yellow-100',
  }
}
class Frame extends PureComponent {
  render() {
    const { theme, children } = this.props

    return (
      <View cls={`flx-i ${themeSystem.backgrounds[theme]}`}>
        <Text
          uppercase={true}
          type='logo'
          additionalStyles="tac yellow-600 mv3"
          customStyles={{
            letterSpacing: 3
          }}
        >
          Khimera
        </Text>
        <Body theme={theme}>
          {children}
        </Body>
      </View>
    )
  }
}

export default wrap(Frame)