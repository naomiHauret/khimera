import React, { PureComponent } from "react"
import { Text as NativeText } from "react-native"
import { wrap } from "react-native-style-tachyons"
import PropTypes from "prop-types"

class Text extends PureComponent {
  render() {
    const { children, additionalStyles, customStyles, type, uppercase } = this.props
    let content
    if (typeof children === "string") {
      content = uppercase === true ? children.toUpperCase() : children
    }
    return (
      <NativeText style={customStyles} cls={`ff-${type} ${additionalStyles !== undefined ? additionalStyles : ""}`}>
        {content}
      </NativeText>
    )
  }
}
Text.propTypes = {
  additionalStyles: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["regular", "bold", "italic", "logo"]),
}
Text.defaultProps = {
  type: "regular",
  additionalStyles: "",
}

export default wrap(Text)
