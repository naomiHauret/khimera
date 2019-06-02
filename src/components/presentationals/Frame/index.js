import React, { PureComponent } from "react"
import { View, TouchableOpacity } from "react-native"
import Text from "components/presentationals/Text"
import Body from "components/presentationals/Body"
import { wrap } from "react-native-style-tachyons"
import { MaterialIcons } from "@expo/vector-icons"
import { withNavigation } from "react-navigation"

const themeSystem = {
  backgrounds: {
    clear: "bg-white",
    colorful: "bg-yellow-100",
  },
}
class Frame extends PureComponent {
  render() {
    const { theme, children, withBackButton, navigation } = this.props

    return (
      <View cls={`flx-i ${themeSystem.backgrounds[theme]}`} style={{ position: "relative" }}>
        <Text
          uppercase={true}
          type="logo"
          additionalStyles="tac yellow-600 mv3"
          customStyles={{
            letterSpacing: 3,
          }}
        >
          Khimera
        </Text>
        {withBackButton === true && (
          <TouchableOpacity cls="absolute" style={{ left: 10, top: 20 }} onPress={() => navigation.goBack()}>
            <MaterialIcons size={25} name="arrow-back" cls="grey-200" />
          </TouchableOpacity>
        )}
        <Body>{children}</Body>
      </View>
    )
  }
}

export default withNavigation(wrap(Frame))
