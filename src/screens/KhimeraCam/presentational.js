import React, { PureComponent, Fragment } from "react"
import { wrap } from "react-native-style-tachyons"
import { t } from "utils/translation"
import { NavigationEvents } from "react-navigation"
import ViewAnimal from "./ViewAnimal"
import ViewHuman from "./ViewHuman"
import { View, Dimensions, TouchableOpacity, Image } from "react-native"
import GestureRecognizer, { swipeDirections } from "react-native-swipe-gestures"
import * as Animatable from "react-native-animatable"
import Swiper from "react-native-swiper"
import ScreenProfiles from "screens/Profiles"
import Text from 'components/presentationals/Text'
class KhimeraCam extends PureComponent {
  state = {
    camView: "ANIMAL",
    backgroundColor: "#223249",
  }


  _toggleMode = () => this.setState({
    camView: this.state.camView === "ANIMAL" ? "HUMAN" : "ANIMAL",
  })

  // on up swipe gesture, go to profiles
  _onSwipeDown(gestureState) {
    this.props.navigation.navigate("ScreenProfiles")
  }

  // on down swipe gesture, toggle between human and animal "cam"
  _onSwipeUp = (gestureState) => this._toggleMode()

  render() {
    const { translation, navigation, currentAnimal, currentHuman } = this.props
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    }
    const profile = {
      ...this.state.camView === "ANIMAL" ? currentAnimal : currentHuman
    }
    return (
      <GestureRecognizer
        onSwipeUp={(state) => this._onSwipeUp(state)}
        onSwipeDown={(state) => this._onSwipeDown(state)}
        config={config}
        style={{
          flex: 1,
          backgroundColor: this.state.backgroundColor,
          position: "relative",
        }}
      >
        <Swiper cls="flx-i" loop={false} showsPagination={false} index={1}>
          <View cls="flx-i">
            <Text>left</Text>
          </View>
          <Swiper loop={false} showsPagination={false} index={1}>

            {this.state.camView === "ANIMAL" ? <Animatable.View cls="flx-i" easing="ease-out-quart" animation="fadeInUpBig" duration={250} >
                <ViewAnimal mood={profile.mood[profile.mood.length - 1]} translation={translation} />
            </Animatable.View> : <Animatable.View cls="flx-i" easing="ease-out-quart" animation="fadeInDownBig" duration={250} >
                <ViewHuman mood={profile.mood[profile.mood.length - 1]} translation={translation} />
                </Animatable.View>
              }
          </Swiper>
          <View cls="flx-i">
            <Text>Right</Text>
          </View>
        </Swiper>
        <Animatable.View animation="bounceIn" easing="ease-out-circle" delay={1650} style={{ top: 15, left: 0 }} cls="absolute aic w100vw">
          <TouchableOpacity cls="aic" onPress={() => navigation.navigate('ScreenProfiles')}>
              <Image  source={{uri: profile.picture}} style={{ borderRadius: 9999, resizeMode: 'cover', width: 80, height: 80}} />
              <View cls="br5 pa2 bg-yellow-300" style={{bottom: 15}}>
                <Text type="bold" additionalStyles="yellow-600 f7">
                  {profile.name}
                </Text>
              </View>
            </TouchableOpacity>
        </Animatable.View>
        <Animatable.View animation="bounceIn" easing="ease-out-circle" delay={1950} style={{ bottom: 25, left: 0 }} cls="absolute aic w100vw">
          <TouchableOpacity cls="aic" onPress={() => this._toggleMode()}>
              <Text type="bold" additionalStyles="yellow-600 f7">
                yoooo
              </Text>
          </TouchableOpacity>
        </Animatable.View>
      </GestureRecognizer>
    )
  }
}

export default wrap(KhimeraCam)
