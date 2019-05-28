import React, { PureComponent, Fragment } from "react"
import { Image, View, ActivityIndicator } from "react-native"
import Frame from "components/presentationals/Frame"
import Heading from "components/presentationals/Heading"
import Text from "components/presentationals/Text"
import Paragraph from "components/presentationals/Paragraph"
import Illustration from "components/presentationals/Illustration"
import { wrap } from "react-native-style-tachyons"
import { t } from "utils/translation"
import { COLOR_YELLOW_500 } from "utils/designSystem"
import { NavigationEvents } from "react-navigation"

class Pairing extends PureComponent {
  state = {
    loading: true,
  }

  constructor(props) {
    super(props)
    this._checkPairing()
  }

  // change screen if we already paired our device to decoy
  _checkPairing = () => {
    if (this.props.paired === true) {
      this.props.navigation.navigate("ScreenOnboarding")
    }
  }

  componentDidMount() {
    // we use hardcoded values
    // because DECOY is not real
    const { navigation, paired } = this.props
    if (paired === false) {
      // not checking this would cause an error in next screens
      setTimeout(
        () =>
          this.setState({
            loading: false,
          }),
        12000,
      ) // hide loader
      setTimeout(() => this.props.navigation.navigate("ScreenOnboarding"), 12001) // change screen
    }
  }

  render() {
    const { translation, navigation, pairingDone } = this.props
    return (
      <Frame theme="colorful">
        <NavigationEvents onDidBlur={(payload) => pairingDone()} />
        <Heading margins="mb3">{t("screens.pairing.title", translation)}</Heading>
        <Paragraph additionalStyles="f7 mb3">{t("screens.pairing.text", translation)}</Paragraph>
        <ActivityIndicator animating={this.state.loading} color={COLOR_YELLOW_500} size="large" />
        <View cls="flx-i pt4 jcfe">
          <Illustration src={require("./../../../assets/images/pairing.png")} />
        </View>
      </Frame>
    )
  }
}

export default wrap(Pairing)
