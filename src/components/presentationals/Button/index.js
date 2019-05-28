import React, { PureComponent } from "react"
import { TouchableOpacity, View } from "react-native"
import { wrap } from "react-native-style-tachyons"
import Text from "components/presentationals/Text"
const themeSystem = {
  align: {
    left: "tal",
    right: "tar",
    center: "tac",
  },
  backgrounds: {
    flat: {
      muted: {
        true: "bg-transparent",
        false: "bg-transparent",
      },
    },
    pill: {
      muted: {
        true: "bg-transparent",
        false: "bg-transparent",
      },
    },
  },
  colors: {
    flat: {
      muted: {
        true: "blue_40a",
        false: "blue",
      },
    },
    pill: {
      muted: {
        true: "yellow-500__40",
        false: "yellow-500",
      },
    },
  },
  fontSizes: {
    flat: {
      muted: {
        true: "f6",
        false: "f5",
      },
    },
    pill: {
      muted: {
        true: "f6",
        false: "f6",
      },
    },
  },
  borders: {
    pill: "ba b__yellow_500",
    flat: "ba b__transparent",
  },
}
export default wrap(
  class Button extends PureComponent {
    static defaultProps = {
      theme: "flat",
      muted: false,
      align: "center",
      disabled: false,
    }
    render() {
      const { children, align, theme, muted, handleOnPress, disabled } = this.props
      return (
        <TouchableOpacity
          disabled={disabled}
          onPress={handleOnPress}
          cls={`br5 ph2 pv2 ${themeSystem.borders[theme]} ${themeSystem.backgrounds[theme].muted[muted]}`}
        >
          <Text
            type="bold"
            additionalStyles={` ${themeSystem.align[align]} ${themeSystem.colors[theme].muted[muted]} ${
              themeSystem.fontSizes[theme].muted[muted]
            }`}
          >
            {children}
          </Text>
        </TouchableOpacity>
      )
    }
  },
)
