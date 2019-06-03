import React, { PureComponent, Fragment } from "react"
import { Image, View, ActivityIndicator } from "react-native"
import Frame from "components/wired/Frame"
import Heading from "components/presentationals/Heading"
import Text from "components/presentationals/Text"
import Paragraph from "components/presentationals/Paragraph"
import Illustration from "components/presentationals/Illustration"
import { wrap } from "react-native-style-tachyons"
import { t } from "utils/translation"
import { COLOR_YELLOW_500 } from "utils/designSystem"
import { NavigationEvents } from "react-navigation"

class ProfileSaved extends PureComponent {
  state = {
    loading: true,
  }

  _moveToNextScreen() {
    // we use hardcoded values
    // because DECOY is not real
    const { navigation, completeCheckIn, isCheckInCompleted } = this.props
    if (isCheckInCompleted === false) {
      // not checking this would cause an error in next screens
      completeCheckIn()
    }
    setTimeout(
      () =>
        this.setState({
          loading: false,
        }),
      2800,
    ) // hide loader
    setTimeout(() => this.props.navigation.navigate("ScreenKhimeraCam"), 3000) // change screen
  }

  render() {
    const { translation, navigation } = this.props
    return (
      <Fragment>
        <NavigationEvents onDidFocus={(payload) => this._moveToNextScreen()} />
        <Frame theme="clear">
          <Heading margins="mb3">{t("screens.profilesSaved.title", translation)}</Heading>
          <Paragraph additionalStyles="f7 mb3">{t("screens.profilesSaved.text", translation)}</Paragraph>
          <ActivityIndicator animating={this.state.loading} color={COLOR_YELLOW_500} size="large" />
          <View cls="flx-i pt4 jcfe">
            <Illustration src={require("./../../../assets/images/success.png")} />
          </View>
        </Frame>
      </Fragment>
    )
  }
}

export default wrap(ProfileSaved)
