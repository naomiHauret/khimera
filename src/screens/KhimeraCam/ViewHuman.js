import React, { PureComponent, Fragment } from "react"
import Heading from "components/presentationals/Heading"
import Paragraph from "components/presentationals/Paragraph"
import Text from "components/presentationals/Text"
import Button from "components/presentationals/Button"
import { wrap, styles as s } from "react-native-style-tachyons"
import { t } from "utils/translation"
import { Transition } from "react-navigation-fluid-transitions"
import {
  Vibration,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native"
import { Camera, Video } from "expo"
import { AntDesign, Entypo, MaterialIcons, FontAwesome } from "@expo/vector-icons"
import Emoji from "react-native-emoji"
import * as Animatable from "react-native-animatable"
import { emotions } from "utils/emotions"
import delay from "delay"

class ViewHuman extends PureComponent {
  state = {
    moodEvent: null,
    recording: false,
    duration: 0,
    canPlayPickerAnimation: false,
    emotionPickerVisible: false,
    pickedMood: null,
  }

  _showEmotionPicker = () =>
    this.setState({
      canPlayPickerAnimation: true,
      emotionPickerVisible: true,
    })

  _toggleEmotionPicker = () =>
    this.setState({
      canPlayPickerAnimation: true,
      emotionPickerVisible: !this.state.emotionPickerVisible,
    })

  _takePicture = async () => {
    this.camera.resumePreview()
    if (this.camera) {
      this.camera.takePictureAsync().then((data) => {
        this.setState({
          moodEvent: {
            type: "picture",
            content: data.uri,
          },
        })
        Vibration.vibrate()
        this.state.pickedMood === null && this._showEmotionPicker()
      })
    }
  }

  _registerRecord = async () => {
    const { recording, duration } = this.state
    if (recording) {
      await delay(1000)
      this._registerRecord()
    }
  }

  _startRecording = async () => {
    if (!this.camera) {
      return
    }
    this.props.disableButtons()
    await this.setState({ recording: true })
    this._registerRecord()
    const record = await this.camera.recordAsync()
    this.setState({
      moodEvent: {
        type: "video",
        content: record.uri,
      },
    })
  }

  _stopRecording = async () => {
    if (!this.camera) {
      return
    }

    await this.camera.stopRecording()
    Vibration.vibrate()
    this.props.enableButtons()
    this.state.pickedMood === null && this._showEmotionPicker()
    this.setState({ recording: false })
  }

  _toggleRecording = () => {
    const { recording } = this.state

    return recording ? this._stopRecording() : this._startRecording()
  }
  _removeMood = () => {
    this.setState({
      moodEvent: null,
    })
  }

  _pickMood = (value) => {
    this.setState({
      emotionPickerVisible: false,
      pickedMood: value,
    })
  }

  _updateMood = (mood) => {
    this.props.sendMood(mood.uid)
    this._removeMood()
    this._pickMood(null)
  }

  render() {
    const { translation, onSubmit, navigation } = this.props
    const { moodEvent, recording, canPlayPickerAnimation, pickedMood, emotionPickerVisible } = this.state
    return (
      <View cls="flx-i" style={{ position: "relative" }}>
        {moodEvent ? (
          <Fragment>
            {moodEvent.type === "picture" ? (
              <Image
                cls="absolute"
                style={{
                  top: 0,
                  left: 0,
                  width: Dimensions.get("window").width,
                  height: Dimensions.get("window").height,
                }}
                source={{ uri: moodEvent.content }}
              />
            ) : (
              <Video
                shouldPlay={true}
                resizeMode="cover"
                isLooping={true}
                rate={1.0}
                volume={1.0}
                source={{
                  uri: moodEvent.content,
                }}
                cls="absolute"
                style={{
                  top: 0,
                  left: 0,
                  width: Dimensions.get("window").width,
                  height: Dimensions.get("window").height,
                }}
                isPortrait={true}
              />
            )}
            {pickedMood && (
              <View
                cls="absolute aic jcc"
                style={{
                  left: 0,
                  bottom: 120,
                  width: Dimensions.get("window").width,
                }}
              >
                <View cls="flxdr pa2 br5 bg-white aic" style={{ elevation: 5 }}>
                  <TouchableOpacity
                    onPress={() => {
                      this._updateMood(pickedMood)
                    }}
                  >
                    <FontAwesome name="paper-plane-o" cls="blue mr3" size={25} />
                  </TouchableOpacity>
                  <Text additionalStyles="grey-100 mr3">{t("labels.or", translation)}</Text>
                  <TouchableOpacity onPress={this._removeMood}>
                    <MaterialIcons name="close" size={25} cls="grey-100" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
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
              style={{
                bottom: 0,
                left: 0,
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height,
              }}
              cls="absolute"
              onPress={this._toggleEmotionPicker}
            >
              <Fragment />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                recording === true ? this._stopRecording() : this._takePicture()
              }}
              onLongPress={this._toggleRecording}
              animation="fadeIn"
              iterationCount={recording === true ? "infinite" : 1}
              direction={recording === true ? "alternate-reverse" : "normal"}
              cls="absolute br5 bg-transparent"
              style={{
                bottom: 80,
                left: Dimensions.get("window").width / 2 - 40,
                width: 80,
                height: 80,
                elevation: 25,
              }}
            >
              <Entypo name="circle" size={80} cls="white" />
              {recording === true && (
                <Animatable.View animation="fadeIn" iterationCount="infinite" direction="alternate-reverse">
                  <FontAwesome style={{ top: -63, left: 23 }} cls="absolute" name="circle" size={40} cls="red" />
                </Animatable.View>
              )}
            </TouchableOpacity>
          </Fragment>
        )}
        {canPlayPickerAnimation && (
          <Animatable.View
            cls="absolute"
            style={{
              bottom: 180,
              width: Dimensions.get("window").width,
              left: 0,
            }}
            animation={emotionPickerVisible ? "bounceIn" : "bounceOut"}
          >
            <ScrollView scrollEnabled={false}>
              <ScrollView horizontal>
                <TouchableWithoutFeedback>
                  <FlatList
                    horizontal={true}
                    data={emotions}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        key={item.uid}
                        onPress={() => this._pickMood(item)}
                        style={{
                          elevation: 25,
                          flexDirection: "row",
                          backgroundColor: "white",
                          borderRadius: 9999,
                          paddingVertical: 5,
                          paddingHorizontal: 10,
                          marginHorizontal: 10,
                        }}
                      >
                        <Text type="bold" additionalStyles="f7 blue mr2">
                          {t(`behaviours.${item.uid}`, translation)}
                        </Text>
                        <Emoji name={item.emoji} style={{ fontSize: 12 }} />
                      </TouchableOpacity>
                    )}
                  />
                </TouchableWithoutFeedback>
              </ScrollView>
            </ScrollView>
          </Animatable.View>
        )}
        {pickedMood && moodEvent === null && (
          <Animatable.View
            cls="absolute aic jcc"
            style={{
              bottom: 70,
              right: 10,
            }}
            animation={"bounceIn"}
          >
            <TouchableOpacity
              onPress={() => this._updateMood(pickedMood)}
              cls="jcc bg-yellow-200 aic br5"
              style={{
                elevation: 15,
                width: 60,
                height: 60,
              }}
            >
              <FontAwesome name="paper-plane-o" cls="yellow-500 mr1" size={30} />
            </TouchableOpacity>
          </Animatable.View>
        )}
        {pickedMood && (
          <Animatable.View
            delay={550}
            cls="absolute aic jcc"
            style={{
              bottom: 220,
              width: Dimensions.get("window").width,
              left: 0,
            }}
            animation={"bounceIn"}
          >
            <TouchableOpacity
              onPress={() => this._toggleEmotionPicker()}
              cls="jcc bg-white aic"
              style={{
                flexDirection: "row",
                borderRadius: 9999,
                paddingVertical: 5,
                paddingHorizontal: 15,
                flexGrow: 0,
                flexShrink: 1,
              }}
            >
              <Text type="bold" additionalStyles="f5 blue mr2">
                {t(`behaviours.${pickedMood.uid}`, translation)}
              </Text>
              <Emoji name={pickedMood.emoji} style={{ fontSize: 16 }} />
            </TouchableOpacity>
          </Animatable.View>
        )}
      </View>
    )
  }
}
export default wrap(ViewHuman)
