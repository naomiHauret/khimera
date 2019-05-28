import React, { PureComponent } from "react"
import Illustration from "components/presentationals/Illustration"
import Frame from "components/presentationals/Frame"
import Heading from "components/presentationals/Heading"
import Text from "components/presentationals/Text"
import Paragraph from "components/presentationals/Paragraph"
import Button from "components/presentationals/Button"
import { View } from "react-native"
import { wrap } from "react-native-style-tachyons"
import { t } from "utils/translation"
import { Permissions } from "expo"
import { Transition } from "react-navigation-fluid-transitions"
import { NavigationEvents } from "react-navigation"

class SuccessPermissions extends PureComponent {
  constructor(props) {
    super(props)
    this._checkAlreadySawScreen()
  }

  // change screen if we already paired our device to decoy
  _checkAlreadySawScreen = () => {
    if (this.props.checkInComplete === true) {
      this.props.navigation.navigate("ScreenKhimeraCam")
    }
  }
  render() {
    const { translation, navigation, grantPermissisons } = this.props
    return (
      <Frame theme="clear">
        <NavigationEvents onDidFocus={(payload) => grantPermissisons()} />
        <Transition appear="horizontal">
          <View cls="flx-i">
            <Heading margins="mb3">{t("screens.successPermissions.title", translation)}</Heading>
            <Paragraph additionalStyles="f7 mb3">{t("screens.successPermissions.text", translation)}</Paragraph>
            <View cls="flx-i pb2">
              <Illustration src={require("./../../../assets/images/thanks.png")} />
            </View>
            <View cls="mta">
              <Button
                handleOnPress={() => navigation.navigate("ScreenFormProfileHuman")}
                theme="flat"
                muted={false}
                align="center"
              >
                {t("labels.start", translation)}
              </Button>
            </View>
          </View>
        </Transition>
      </Frame>
    )
  }
}
export default wrap(SuccessPermissions)
