import React, { PureComponent } from "react"
import Frame from "components/presentationals/Frame"
import Heading from "components/presentationals/Heading"
import Text from "components/presentationals/Text"
import Body from "components/presentationals/Body"
import Paragraph from "components/presentationals/Paragraph"
import Illustration from "components/presentationals/Illustration"
import { wrap } from "react-native-style-tachyons"
import { t } from "utils/translation"
import { View } from "react-native"
import { LinearGradient } from "expo"

class ViewChart extends PureComponent {
  render() {
    const { translation, navigation, animalName } = this.props

    return (
      <View
        cls="flx-i bg-yellow-100"
        style={{
          paddingTop: 120,
          position: "relative",
        }}
      >
        <Body>
          <Illustration src={require("./../../../assets/images/empty_data.png")} />
          <View cls="flx-i mt3">
            <Heading margins="mb3">{t("screens.chart.label", translation, { name: animalName })}</Heading>
            <Paragraph>{t("screens.chart.text", translation)}</Paragraph>
          </View>
        </Body>
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.4)"]}
          cls="absolute w100vw"
          style={{
            left: 0,
            bottom: 0,
            height: 70,
          }}
        />
      </View>
    )
  }
}
export default wrap(ViewChart)
