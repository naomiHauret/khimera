import React, { PureComponent } from 'react'
import { Picker, View } from 'react-native'
import { wrap } from 'react-native-style-tachyons'
import { FontAwesome } from '@expo/vector-icons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Text from 'components/presentationals/Text'

class Select extends PureComponent {
  state = {
    value: this.props.value
  }
  changeValue = (itemValue) => {
    this.setState({ value: itemValue })
    return this.props.handleChange(itemValue)
  }
  render() {
    const { options, theme, label } = this.props
    const { value } = this.state

    return <View cls="flxdr aic">
      <View cls="flxdr aic">
        <Text>{label}</Text>
      </View>
      <Picker
        cls={`ml1 flx-i`}
        style={{
          backgroundColor: 'transparent',
          transform: [
            { scaleX: 0.875 },
            { scaleY: 0.875},
            { translateX: -20}
          ]
        }}
        selectedValue={value}
        onValueChange={(itemValue, itemIndex) => this.changeValue(itemValue, itemIndex)}
      >
        {options.map((option, index) => <Picker.Item
          key={index}
          label={option.label}
          value={option.value}
        />)}
      </Picker>
      <FontAwesome name="caret-down" size={15} cls='asc' />
    </View>
  }
}

export default wrap(Select)