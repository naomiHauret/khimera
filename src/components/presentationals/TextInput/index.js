import React, { PureComponent } from "react"
import { TextInput as NativeTextInput } from "react-native"
import { wrap, styles as s } from "react-native-style-tachyons"

export default wrap(
  class TextInput extends PureComponent {
    state = {
      text: this.props.value,
    }
    handleChange = (text) => {
      this.setState({ text })
    }

    render() {
      const { placeholder, onInput, value } = this.props
      return (
        <NativeTextInput
          onChangeText={(text) => {
            this.handleChange(text)
            return onInput(text)
          }}
          placeholder={placeholder}
          value={this.state.text}
          spellCheck={false}
          autoCorrect={false}
          autoCapitalize={"none"}
          placeholderTextColor={`#3D3C2D`}
        />
      )
    }
  },
)
