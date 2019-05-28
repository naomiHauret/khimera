import React, { PureComponent, Fragment } from "react"
import Heading from "components/presentationals/Heading"
import Paragraph from "components/presentationals/Paragraph"
import TextInput from "components/presentationals/TextInput"
import Text from "components/presentationals/Text"
import Button from "components/presentationals/Button"
import Illustration from "components/presentationals/Illustration"
import { wrap } from "react-native-style-tachyons"
import { t } from "utils/translation"
import { Transition } from "react-navigation-fluid-transitions"
import {
  KeyboardAvoidingView,
  Vibration,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} from "react-native"
import { Camera, ImagePicker, BlurView } from "expo"
import * as Animatable from "react-native-animatable"
import Frame from "components/presentationals/Frame"
import { AntDesign, Entypo, Feather, MaterialIcons } from "@expo/vector-icons"

class Form extends PureComponent {
  state = {
    currentStep: this.props.values.picture !== null && this.props.values.name !== null ? 1 : 0,
  }

  _goToNextStep = () =>
    this.setState({
      currentStep: this.state.currentStep + 1,
    })

  _handleTypeName = (text) => this.props.editName(text)

  _takePicture = async () => {
    this.camera.resumePreview()
    if (this.camera) {
      this.camera.takePictureAsync().then((data) => {
        this.props.editPicture(data.uri)
        Vibration.vibrate()
      })
    }
  }

  _removePicture = () => {
    this.props.editPicture(null)
  }

  _pickPicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    })

    if (!result.cancelled) {
      this.props.editPicture(result.uri)
    }
  }

  render() {
    const { translation, onSubmit, shouldDisplayBack, navigation } = this.props
    const { picture, name } = this.props.values
    const { currentStep } = this.state
    const steps = [
      {
        component: (
          <Frame theme="clear" withBackButton={shouldDisplayBack}>
            <View cls="flx-i">
              <Illustration src={require("./../../../assets/images/data_human.png")} />
            </View>
            <KeyboardAvoidingView
              style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
              behavior="padding"
            >
              <Heading margins="mb3 tac">{t("labels.humanProfileName", translation)}</Heading>
              <TextInput
                value={name}
                placeholder={t("placeholders.name", translation)}
                onInput={this._handleTypeName}
              />
            </KeyboardAvoidingView>

            <View cls="mta">
              <Button
                handleOnPress={this._goToNextStep}
                theme="flat"
                muted={name === null || name === false || name.trim() === ""}
                align="center"
                disabled={name === null || name === false || name.trim() === ""}
              >
                {t("labels.takePicture", translation)}
              </Button>
            </View>
          </Frame>
        ),
      },
      {
        component: (
          <View cls="flx-i" style={{ position: "relative" }}>
            {picture ? (
              <Fragment>
                <Image
                  cls="absolute"
                  style={{
                    top: 0,
                    left: 0,
                    width: Dimensions.get("window").width,
                    height: Dimensions.get("window").height,
                  }}
                  source={{ uri: picture }}
                />
                <TouchableOpacity
                  onPress={this._removePicture}
                  cls="br5 absolute"
                  style={{
                    bottom: 40,
                    left: Dimensions.get("window").width / 2 - 12.5,
                    width: 25,
                    height: 25,
                    elevation: 25,
                  }}
                >
                  <AntDesign name="closecircle" size={25} cls="white" />
                </TouchableOpacity>
                <View
                  cls="absolute aic jcc"
                  style={{
                    left: 0,
                    bottom: 120,
                    width: Dimensions.get("window").width,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this._goToNextStep()
                      onSubmit()
                    }}
                    type="italic"
                    cls="pa3 br5 bg-white"
                    style={{
                      elevation: 30,
                    }}
                  >
                    <Text additionalStyles="blue tac f5" type="bold">
                      {t("labels.saveProfile", translation, { name: name })}
                    </Text>
                  </TouchableOpacity>
                </View>
              </Fragment>
            ) : (
              <Fragment>
                <Camera
                  ref={(camera) => (this.camera = camera)}
                  ratio="16:9"
                  cls="flx-i"
                  type={Camera.Constants.Type.front}
                  cls="absolute"
                  style={{
                    top: 0,
                    left: 0,
                    width: Dimensions.get("window").width,
                    height: Dimensions.get("window").height,
                  }}
                />
                <TouchableOpacity
                  onPress={this._takePicture}
                  cls="absolute br5 bg-transparent"
                  style={{
                    bottom: 40,
                    left: Dimensions.get("window").width / 2 - 40,
                    width: 80,
                    height: 80,
                    elevation: 25,
                  }}
                >
                  <Entypo name="circle" size={80} cls="white" />
                </TouchableOpacity>
                <BlurView
                  tint="light"
                  intensity={50}
                  cls="br5 absolute aic jcc"
                  style={{
                    height: 50,
                    left: Dimensions.get("window").width / 2 + 60,
                    width: 50,
                    bottom: 40,
                    elevation: 5,
                  }}
                >
                  <TouchableOpacity cls="tac" onPress={this._pickPicture}>
                    <AntDesign name="picture" size={25} cls="white" />
                  </TouchableOpacity>
                </BlurView>
              </Fragment>
            )}
            <BlurView
              tint="light"
              intensity={25}
              cls="br5 absolute flxdr ph3 pv1 aic jcc"
              style={{
                right: 10,
                top: 10,
                elevation: 15,
              }}
            >
              <TextInput
                value={name}
                placeholder={t("placeholders.name", translation)}
                onInput={this._handleTypeName}
              />
              <Feather name="edit-2" size={16} cls="ml2 black" />
            </BlurView>
            {shouldDisplayBack === true && (
              <TouchableOpacity
                cls="absolute"
                style={{ left: 10, top: 20, elevation: 15 }}
                onPress={() => {
                  this._handleTypeName(null)
                  this._removePicture()
                  navigation.goBack()
                }}
              >
                <MaterialIcons size={25} name="arrow-back" cls="white" />
              </TouchableOpacity>
            )}
          </View>
        ),
      },
      // We need a last empty step to avoid camera error
      {
        component: <View />,
      },
    ]
    return steps[currentStep].component
  }
}
export default wrap(Form)
