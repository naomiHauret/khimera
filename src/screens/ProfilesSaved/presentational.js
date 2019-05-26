import React, { PureComponent, Fragment } from 'react'
import { Image, View, ActivityIndicator } from 'react-native'
import Frame from 'components/presentationals/Frame'
import Heading from 'components/presentationals/Heading'
import Text from 'components/presentationals/Text'
import Paragraph from 'components/presentationals/Paragraph'
import Illustration from 'components/presentationals/Illustration'
import { wrap } from "react-native-style-tachyons"
import { t } from 'utils/translation'
import { COLOR_YELLOW_500 } from 'utils/designSystem'
import { NavigationEvents } from 'react-navigation'

class ProfileSaved extends PureComponent {
  state = {
    loading: true,
  }

  componentDidMount() {
    // we use hardcoded values
    // because DECOY is not real
    const { navigation, checkInComplete } = this.props
    if (checkInComplete === false) { // not checking this would cause an error in next screens
      setTimeout(() => this.setState({
        loading: false
      }), 3800) // hide loader
      setTimeout(() => this.props.navigation.navigate('ScreenProfiles'), 4000) // change screen
    }
  }

  render() {
    const { translation, navigation } = this.props
    return <Frame theme="clear">
      <Heading margins="mb3">
        {t('screens.profilesSaved.title', translation)}
      </Heading>
      <Paragraph additionalStyles="f7 mb3">
        {t('screens.profilesSaved.text', translation)}
      </Paragraph>
      <ActivityIndicator
        animating={this.state.loading}
        color={COLOR_YELLOW_500}
        size="large"
      />
      <View cls="flx-i pt4 jcfe">
        <Illustration
          src={require('./../../../assets/images/success.png')}
        />
      </View>
    </Frame>
  }
}

export default wrap(ProfileSaved)