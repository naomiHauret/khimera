import React, { PureComponent, Fragment } from "react"
import { View, Linking, ScrollView } from "react-native"
import { wrap } from "react-native-style-tachyons"
import * as Animatable from "react-native-animatable"
import { t } from "utils/translation"
import Frame from "components/wired/Frame"
import Paragraph from "components/presentationals/Paragraph"
import Heading from "components/presentationals/Heading"
import Button from "components/presentationals/Button"
import Body from "components/presentationals/Body"
export default wrap(
  class About extends PureComponent {
    render() {
      const { translation } = this.props
      const sections = ["app", "premium", "private"]
      return (
        <Frame theme="clear" withBackButton={true}>
          <Animatable.View cls="flx-i" animation="fadeInUp">
            <ScrollView cls="flx-i">
              {sections.map((section, key) => (
                <View key={key}>
                  <Heading margins="mt3 mb3">{t(`screens.about.${section}.title`, translation)}</Heading>
                  <Paragraph>{t(`screens.about.${section}.text`, translation)}</Paragraph>
                  {section === "premium" && (
                    <View cls="mt3 mb4">
                      <Button handleOnPress={() => Linking.openURL("https://parlezvousbestial.now.sh")} theme="pill">
                        {t("labels.goPremium", translation).toUpperCase()}
                      </Button>
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>
          </Animatable.View>
        </Frame>
      )
    }
  },
)
