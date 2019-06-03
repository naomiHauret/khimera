import React, { PureComponent, Fragment } from "react"
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
