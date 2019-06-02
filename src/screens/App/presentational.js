import React, { PureComponent, Fragment } from "react"
import { Permissions, Notifications, Constants } from "expo"
import { View, ActivityIndicator, Image, ScrollView, Text, StatusBar, Platform } from "react-native"
import { wrap } from "react-native-style-tachyons"
import * as Animatable from "react-native-animatable-unmountable"
import MessageOffline from "components/wired/MessageOffline"
import Message from "components/presentationals/Message"
import { COLOR_YELLOW_400 } from "utils/designSystem"
import AppNavigator from "components/wired/AppNavigator"
import { t } from "utils/translation"

export default wrap(
  class App extends PureComponent {
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

    _sendRandomAnimalNotification = () => {
      setTimeout(this._sendRandomBehaviour, 3500)
    }

    componentDidMount() {
      Notifications.addListener(this._handleNotification)
      if (this.props.checkInComplete === true) {
        // this._sendRandomAnimalNotification()
      }
    }

    render() {
      const { checkInComplete, toastrs, removeToast, permissionsGiven } = this.props
      return (
        <View style={{ paddingTop: Platform.OS === "ios" ? 20 : StatusBar.currentHeight }} cls={`flx-i`}>
          <StatusBar hidden={false} />
          <Animatable.View animation="slideInDown">
            <MessageOffline />
          </Animatable.View>
          {toastrs.map((toastr, index) => (
            <Message
              animationEnter="slideInDown"
              animationExit="slideOutUp"
              key={toastr.id}
              theme="info"
              closable={true}
              onClose={() => removeToast(toastr.id)}
            >
              {toastr.text}
            </Message>
          ))}
          <AppNavigator />
        </View>
      )
    }
  },
)
