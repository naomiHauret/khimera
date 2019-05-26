import React from 'react'
import { wrap } from "react-native-style-tachyons"
import PropTypes from 'prop-types'
import Text from 'components/presentationals/Text'

const Paragraph = (props) => {
  const { children, additionalStyles } = props
  return <Text type="regular" customStyles={{lineHeight: 20 }} additionalStyles={`grey-200 ${additionalStyles ? additionalStyles : "" }`}>
    {children}
  </Text>
}

export default wrap(
  Paragraph
)