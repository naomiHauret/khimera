import React, { PureComponent, Fragment } from "react"
import { View, ActivityIndicator, Image, ScrollView, Text, StatusBar, Platform } from "react-native"
import { wrap } from "react-native-style-tachyons"
import * as Animatable from "react-native-animatable-unmountable"
import MessageOffline from "components/wired/MessageOffline"
import Message from "components/presentationals/Message"
import { COLOR_YELLOW_400 } from "utils/designSystem"
import AppNavigator from "components/wired/AppNavigator"

export default wrap(
  class App extends PureComponent {
    render() {
      const { checkInComplete, toastrs, permissionsGiven } = this.props
      return (
        <View style={{ paddingTop: Platform.OS === "ios" ? 20 : StatusBar.currentHeight }} cls={`flx-i`}>
          <StatusBar hidden={false} />
          <Animatable.View animation="slideInDown">
            <MessageOffline />
          </Animatable.View>
          <AppNavigator />
        </View>
      )
    }
  },
)
