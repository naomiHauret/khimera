import React, { PureComponent, Fragment } from "react"
import { wrap } from "react-native-style-tachyons"
import { t } from "utils/translation"
import { NavigationEvents } from "react-navigation"
import ViewAnimal from "./ViewAnimal"
import ViewHuman from "./ViewHuman"
import ViewLessons from "./ViewLessons"
import ViewChart from "./ViewChart"
import { View, Dimensions, TouchableOpacity, Image, Picker, Linking } from "react-native"
import GestureRecognizer, { swipeDirections } from "react-native-swipe-gestures"
import * as Animatable from "react-native-animatable"
import Swiper from "react-native-swiper"
import ScreenProfiles from "screens/Profiles"
import Text from "components/presentationals/Text"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Notifications, Permissions, BlurView } from "expo"

class KhimeraCam extends PureComponent {
  state = {
    camView: "ANIMAL",
    backgroundColor: "#223249",
    canSwitchView: true,
  }

  _toggleSwitchView = (value) =>
    this.setState({
      canSwitchView: value,
    })

  _toggleMode = () =>
    this.setState({
      camView: this.state.camView === "ANIMAL" ? "HUMAN" : "ANIMAL",
    })

  // on up swipe gesture, go to profiles
  _onSwipeDown = (gestureState) => this.state.canSwitchView && this.props.navigation.navigate("ScreenProfiles")

  // on down swipe gesture, toggle between human and animal "cam"
  _onSwipeUp = (gestureState) => this.state.canSwitchView && this._toggleMode()

  _handleNotification() {
    return
  }
  _sendRandomBehaviour = () => {
    const { translation, checkInComplete, currentAnimal, updateAnimalMood } = this.props
    const emotionsList = [
      "default",
      "angry",
      "irritated",
      "unsafe",
      "nervousness",
      "joy",
      "excitement",
      "bored",
      "relaxed",
      "calm",
      "hungry",
    ]
    let randomEmotion = Math.floor(Math.random() * (emotionsList.length - 1 - 0 + 1) + 0)
    Notifications.presentLocalNotificationAsync({
      title: currentAnimal.name,
      body: t("messages.animalFeeling", translation, {
        emotion: t(`behaviours.${emotionsList[randomEmotion]}`, translation),
        name: currentAnimal.name,
      }),
      android: {
        sound: true,
      },
    })
    updateAnimalMood({ id: currentAnimal.id, mood: emotionsList[randomEmotion] })
  }

  _sendNotificationImmediately = () => {
    const { translation, currentAnimal } = this.props
    Notifications.presentLocalNotificationAsync({
      title: t("labels.messageSent", translation),
      body: t("messages.decoyToAnimal", translation, {
        animalName: currentAnimal.name,
      }),
      android: {
        sound: true,
      },
    })
  }

  _sendRandomAnimalNotification = () => {
    setTimeout(this._sendRandomBehaviour, 10500)
  }

  componentDidMount() {
    Notifications.addListener(this._handleNotification)
    this._sendRandomAnimalNotification()
  }

  render() {
    const {
      freeLessonTaken,
      takeFreeLesson,
      addToast,
      translation,
      navigation,
      currentAnimal,
      currentHuman,
      updateHumanMood,
      changeLocale,
    } = this.props
    const { canSwitchView } = this.state
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    }
    const profile = {
      ...(this.state.camView === "ANIMAL" ? currentAnimal : currentHuman),
    }

    const translationOptions = {}
    translation.available.map(
      (locale) =>
        (translationOptions[locale] = {
          value: locale,
          label: t(`languages.${locale}`, translation),
        }),
    )

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
        <Swiper
          ref={(swiper) => {
            this._swiper = swiper
          }}
          cls="flx-i"
          scrollEnabled={canSwitchView}
          loop={false}
          showsPagination={false}
          index={1}
        >
          <View cls="flx-i">
            <ViewLessons
              freeLessonTaken={freeLessonTaken}
              takeFreeLesson={takeFreeLesson}
              translation={translation}
              animalName={currentAnimal.name}
            />
          </View>
          <Swiper scrollEnabled={canSwitchView} loop={false} showsPagination={false} index={1}>
            {this.state.camView === "ANIMAL" ? (
              <Animatable.View cls="flx-i" easing="ease-out-quart" animation="fadeInUpBig" duration={250}>
                <ViewAnimal mood={profile.mood[profile.mood.length - 1]} translation={translation} />
              </Animatable.View>
            ) : (
              <Animatable.View cls="flx-i" easing="ease-out-quart" animation="fadeInDownBig" duration={250}>
                <ViewHuman
                  disableButtons={() => this._toggleSwitchView(false)}
                  enableButtons={() => this._toggleSwitchView(true)}
                  mood={profile.mood[profile.mood.length - 1]}
                  translation={translation}
                  sendMood={(mood) => {
                    setTimeout(() => {
                      addToast({
                        id: Date.now(),
                        text: t("messages.khimeraToDecoy", translation),
                      })
                    }, 800)
                    updateHumanMood({ mood, id: profile.id })
                    setTimeout(this._sendNotificationImmediately, Math.floor(Math.random() * (15000 - 8000 + 1) + 8000))
                  }}
                />
              </Animatable.View>
            )}
          </Swiper>
          <View cls="flx-i">
            <ViewChart animalName={currentAnimal.name} translation={translation} />
          </View>
        </Swiper>
        <Animatable.View
          animation="bounceIn"
          easing="ease-out-circle"
          delay={1650}
          style={{ top: 15, left: 0 }}
          cls="absolute aic w100vw"
        >
          <TouchableOpacity
            disabled={!canSwitchView}
            style={{ opacity: canSwitchView ? 1 : 0 }}
            cls="aic"
            onPress={() => navigation.navigate("ScreenProfiles")}
          >
            <Image
              source={{ uri: profile.picture }}
              style={{ borderRadius: 9999, resizeMode: "cover", width: 80, height: 80 }}
            />
            <View cls="br5 pa2 bg-yellow-100" style={{ bottom: 15 }}>
              <Text type="bold" additionalStyles="yellow-600 f7">
                {profile.name}
              </Text>
            </View>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View animation="fadeInRight" delay={2400} style={{ top: 20, right: 20, width: 40 }} cls="absolute">
          <BlurView tint="dark" intensity={10} cls="flx-i br5 pv3">
            <View cls="aic jcc flx-i mb3" style={{ position: "relative" }}>
              <MaterialCommunityIcons name="google-translate" cls="white" size={20} />
              <Picker
                selectedValue={translation.locale}
                style={{ position: "absolute", top: 0, left: 0, opacity: 0, width: "100%", height: "100%" }}
                onValueChange={(itemValue, itemIndex) => changeLocale(itemValue)}
              >
                {Object.values(translationOptions).map((option, key) => (
                  <Picker.Item label={option.label} value={option.value} key={key} />
                ))}
              </Picker>
            </View>
            <TouchableOpacity cls="aic jcc flx-i mb3" onPress={() => navigation.navigate("ScreenAbout")}>
              <MaterialCommunityIcons name="help" cls="white" size={20} />
            </TouchableOpacity>
            <TouchableOpacity cls="aic jcc flx-i" onPress={() => Linking.openURL("https://parlezvousbestial.now.sh")}>
              <MaterialCommunityIcons name="cart-outline" cls="white" size={20} />
            </TouchableOpacity>
          </BlurView>
        </Animatable.View>
        <View style={{ bottom: 15, left: 0, opacity: canSwitchView ? 1 : 0 }} cls="absolute aic w100vw flxdr">
          <TouchableOpacity
            disabled={!canSwitchView}
            cls="mra ml3"
            onPress={() => {
              if (this._swiper.state.index === 1) {
                this._swiper.scrollBy(-1)
              } else if (this._swiper.state.index === 2) {
                this._swiper.scrollBy(-2)
              }
            }}
          >
            <MaterialCommunityIcons size={25} name="school" cls="white" style={{ elevation: 15 }} />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!canSwitchView}
            onPress={() => {
              if (this._swiper.state.index === 0) {
                this._swiper.scrollBy(1)
              } else if (this._swiper.state.index === 2) {
                this._swiper.scrollBy(-1)
              }
              this._swiper.state.index === 1 && this._toggleMode()
            }}
          >
            <MaterialCommunityIcons
              size={40}
              name={this.state.camView === "HUMAN" ? "dog" : "face"}
              cls="white"
              style={{ elevation: 15 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!canSwitchView}
            cls="mla mr3"
            onPress={() => {
              if (this._swiper.state.index === 1) {
                this._swiper.scrollBy(1)
              } else if (this._swiper.state.index === 0) {
                this._swiper.scrollBy(2)
              }
            }}
          >
            <MaterialCommunityIcons size={25} name="chart-line" cls="white" style={{ elevation: 15 }} />
          </TouchableOpacity>
        </View>
      </GestureRecognizer>
    )
  }
}

export default wrap(KhimeraCam)
