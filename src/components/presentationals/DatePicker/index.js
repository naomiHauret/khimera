import React, {PureComponent, Fragment} from 'react'
import { DatePickerAndroid, View, TouchableOpacity } from 'react-native'
import Text from 'components/presentationals/Text'
import { wrap } from "react-native-style-tachyons"

class DatePicker extends PureComponent {
  state = {
    date: this.props.value,
  }
  _pickDate = async() => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date()
      })
      if (action !== DatePickerAndroid.dismissedAction) {
        let newDate = `${day}/${month + 1}/${year}`
        this.props.handleChange(newDate)
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message)
    }
  }

  render() {
    const { label, value } = this.props
    return <View cls="flx-i flx-row">
      <Text>{label}</Text>
      <TouchableOpacity cls="flx-i ml3 " onPress={() => this._pickDate()}>
        <Text>
          {value !== null ? value : '-- / -- / --'}
        </Text>
      </TouchableOpacity>
    </View>
  }
}

export default wrap(DatePicker)
