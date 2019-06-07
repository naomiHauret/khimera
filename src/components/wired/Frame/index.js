import React, { PureComponent } from "react"
import { View, TouchableOpacity, Picker } from "react-native"
import Text from "components/presentationals/Text"
import Body from "components/presentationals/Body"
import { wrap } from "react-native-style-tachyons"
import { MaterialIcons } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { connect } from "react-redux"
import { actions as TranslationActions } from "store/symbiotes/Translation"
import { t } from "utils/translation"

const mapStateToProps = (state) => ({
  translation: state.translation,
})

const mapDispatchToProps = (dispatch, props) => {
  return {
    changeLocale: (payload) => dispatch(TranslationActions.changeLocale(payload)),
  }
}

const themeSystem = {
  backgrounds: {
    clear: "bg-white",
    colorful: "bg-yellow-100",
  },
}
class Frame extends PureComponent {
  render() {
    const { theme, translation, changeLocale, children, withBackButton, navigation } = this.props
    const translationOptions = {}
    translation.available.map(
      (locale) =>
        (translationOptions[locale] = {
          value: locale,
          label: t(`languages.${locale}`, translation),
        }),
    )
    return (
      <View cls={`flx-i ${themeSystem.backgrounds[theme]}`} style={{ position: "relative" }}>
        <Text
          uppercase={true}
          type="logo"
          additionalStyles="tac yellow-600 mv3"
          customStyles={{
            letterSpacing: 3,
          }}
        >
          Khimera
        </Text>
        {withBackButton === true && (
          <TouchableOpacity cls="absolute" style={{ left: 10, top: 20 }} onPress={() => navigation.goBack()}>
            <MaterialIcons size={25} name="arrow-back" cls="grey-200" />
          </TouchableOpacity>
        )}
        <View cls="absolute" style={{ right: 10, top: 15 }}>
          <View style={{ position: "relative" }}>
            <MaterialCommunityIcons name="google-translate" cls="yellow-600 ml1" size={20} />
            <Picker
              selectedValue={translation.locale}
              style={{ position: "absolute", top: 0, left: 0, opacity: 0, width: "100%", height: "100%" }}
              onValueChange={(itemValue, itemIndex) => changeLocale(itemValue)}
            >
              {Object.values(translationOptions).map((option, key) => (
                <Picker.Item label={option.label} value={option.value} key={key} />
              ))}
            </Picker>
          </View>
        </View>
        <Body>{children}</Body>
      </View>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(wrap(Frame))
