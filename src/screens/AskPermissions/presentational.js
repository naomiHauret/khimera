import React, { PureComponent } from "react"
import Illustration from "components/presentationals/Illustration"
import Frame from "components/wired/Frame"
import Heading from "components/presentationals/Heading"
import Text from "components/presentationals/Text"
import Paragraph from "components/presentationals/Paragraph"
import Button from "components/presentationals/Button"
import { wrap } from "react-native-style-tachyons"
import { t } from "utils/translation"
import { Permissions } from "expo"
import { View } from "react-native"
import * as Animatable from "react-native-animatable"

class AskPermissions extends PureComponent {
  constructor(props) {
    super(props)
    this._redirectIfPermissionsGranted()
  }

  _redirectIfPermissionsGranted = async () => {
    if (this.props.permissionsGranted === true) {
      const { Permissions } = Expo
      const { status, expires, permissions } = await Permissions.getAsync(
        Permissions.AUDIO_RECORDING,
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL,
        Permissions.NOTIFICATIONS,
      )
      if (status === "granted") {
        this.props.navigation.navigate("ScreenSuccessPermissions")
      }
    }
  }
  _askPermissions = async () => {
    const { Permissions } = Expo
    const { status, expires, permissions } = await Permissions.askAsync(
      Permissions.AUDIO_RECORDING,
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL,
      Permissions.NOTIFICATIONS,
    )
    if (status === "granted") {
      this.props.navigation.navigate("ScreenSuccessPermissions")
    }
  }
  render() {
    const { translation, navigation } = this.props
    return (
      <Animatable.View cls="flx-i" animation="fadeIn">
        <Frame theme="clear">
          <Heading margins="mb3">{t("screens.askPermissions.title", translation)}</Heading>
          <Paragraph additionalStyles="f7 mb3">{t("screens.askPermissions.text", translation)}</Paragraph>
          <View cls="flx-i">
            <Illustration src={require("./../../../assets/images/permission.png")} />
          </View>
          <View cls="mta">
            <Button handleOnPress={this._askPermissions} theme="flat" muted={false} align="center">
              {t("labels.understand", translation)}
            </Button>
          </View>
        </Frame>
      </Animatable.View>
    )
  }
}
export default wrap(AskPermissions)
