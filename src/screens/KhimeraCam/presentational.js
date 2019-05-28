import React, { PureComponent, Fragment } from "react"
import { wrap } from "react-native-style-tachyons"
import { t } from "utils/translation"
import { NavigationEvents } from "react-navigation"
import ViewAnimal from './ViewAnimal'
import { View } from 'react-native'

class KhimeraCam extends PureComponent {
  state = {
    currentView: "animal",
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { translation, navigation } = this.props
    return (
      <View cls="flx-i">
        <ViewAnimal />
      </View>
    )
  }
}

export default wrap(KhimeraCam)
