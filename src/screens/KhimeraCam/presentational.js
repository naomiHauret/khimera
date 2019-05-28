import React, { PureComponent, Fragment } from "react"
import { wrap } from "react-native-style-tachyons"
import { t } from "utils/translation"
import { NavigationEvents } from "react-navigation"
import ViewAnimal from './ViewAnimal'
import { View, Text, Dimensions } from 'react-native'
import GestureRecognizer, { swipeDirections } from "react-native-swipe-gestures"
import * as Animatable from 'react-native-animatable'
import Swiper from 'react-native-swiper'
import ScreenProfiles from 'screens/Profiles'

class KhimeraCam extends PureComponent {
  state = {
    camView: "ANIMAL",
    backgroundColor: "#223249"
  }

  // on up swipe gesture, go to profiles
  _onSwipeDown(gestureState) {
    this.props.navigation.navigate('ScreenProfiles')
  }

  // on down swipe gesture, toggle between human and animal "cam"
  _onSwipeUp(gestureState) {
    this.setState({
      camView: this.state.camView === 'ANIMAL' ? 'HUMAN' : 'ANIMAL'
    })
  }


  render() {
    const { translation, navigation } = this.props
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    }
    return (
      <GestureRecognizer
        onSwipeUp={(state) => this._onSwipeUp(state)}
        onSwipeDown={(state) => this._onSwipeDown(state)}
        config={config}
        style={{
          flex: 1,
          backgroundColor: this.state.backgroundColor,
          position: 'relative'
        }}
      >
        <Swiper
          cls="flx-i"
          loop={false}
          showsPagination={false}
          index={1}>
          <View cls="flx-i">
            <Text>
              left
            </Text>
          </View>
          <Swiper
            loop={false}
            showsPagination={false}
            index={1}>
            <Animatable.View cls="flx-i" easing="ease-out-quart" animation="fadeInUpBig" duration={250} delay={1250}>
              <ViewAnimal />
            </Animatable.View>
          </Swiper>
          <View cls="flx-i">
            <Text>
              Right
            </Text>
          </View>
        </Swiper>
      </GestureRecognizer>
    )
  }
}

export default wrap(KhimeraCam)
