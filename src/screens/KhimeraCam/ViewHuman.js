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
import Emoji from 'react-native-emoji'
import * as Animatable from "react-native-animatable"
import { emotions } from 'utils/emotions'

class ViewHuman extends PureComponent {
  state = {
    moodEvent: null,
    recording: false,
    duration: 0,
    emotionPickerVisible: false,
  }

  _toggleEmotionPicker = () => {
    console.log("SHE")
    this.setState({
    emotionPickerVisible: !this.state.emotionPickerVisible
  })
}
  _goToNextStep = () =>
    this.setState({
      currentStep: this.state.currentStep + 1,
    })

  _takePicture = async () => {
    this.camera.resumePreview()
    if (this.camera) {
      this.camera.takePictureAsync().then((data) => {
        this.setState({
          moodEvent: {
            type: 'picture',
            content: data.uri
          },
        })
        Vibration.vibrate()
      })
    }
  }

  _registerRecord = async () => {
    const { recording, duration } = this.state
    if (recording) {
      await delay(1000)
      this.setState(state => ({
        ...state,
        duration: state.duration + 1
      }));
      this._registerRecord()
    }
  }

  _startRecording = async () => {
    if (!this.camera) {
      return
    }
    await this.setState(state => ({ ...state, recording: true }))
    this._registerRecord()
    const record = await this.camera.recordAsync()
    this.setState({
      moodEvent: {
        type: 'video',
        content: record.uri
      }
    })
  }

  _stopRecording = async () => {
    if (!this.camera) {
      return
    }

    await this.camera.stopRecording()
    this.setState(state => ({ ...state, recording: false, duration: 0 }))
    Vibration.vibrate()
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

  render() {
    const { translation, onSubmit, navigation } = this.props
    const { moodEvent } = this.state

    return <View cls="flx-i" style={{ position: "relative" }}>
      {moodEvent ? <Fragment>
        {moodEvent.type === 'picture' ? <Image
          cls="absolute"
          style={{
            top: 0,
            left: 0,
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
          }}
          source={{ uri: moodEvent.content }}
        /> : <Video
            shouldPlay={true}
            isLooping={true}
            rate={1.0}
            volume={1.0}
            source={{
              uri: moodEvent.content
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
        }
        <View
          cls="absolute aic jcc"
          style={{
            left: 0,
            bottom: 120,
            width: Dimensions.get("window").width,
          }}
        >
          <View cls="flxdr pa2 br5 bg-white" style={{ elevation: 5 }}>
            <TouchableOpacity
              onPress={() => {
                console.log("pouf")
              }}
            >
              <FontAwesome name="paper-plane-o" cls="blue mr5" size={25} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this._removeMood}
            >
              <MaterialIcons name="close" size={25} cls="grey-100" />
            </TouchableOpacity>
          </View>
        </View>
          </Fragment>
          : (
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
            <TouchableOpacity style={{
              bottom: 0,
              left: 0,
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height,
            }} cls="absolute" onPress={this._toggleEmotionPicker}>
              <Fragment />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this._takePicture}
              onLongPress={this._startRecording}
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
            <Animatable.View cls="absolute" style={{
              top: Dimensions.get("window").height / 2 + 60,
              width: Dimensions.get("window").width,
              left: 0,
            }} animation={this.state.emotionPickerVisible === true ? "bounceIn" : "bounceOut"}>
              <ScrollView scrollEnabled={false}>
                <ScrollView horizontal>
                  <TouchableWithoutFeedback>
                    <FlatList horizontal={true}
                      data={emotions}
                      renderItem={({ item }) => <TouchableOpacity style={{
                        elevation: 25,
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        borderRadius: 9999,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        marginHorizontal: 10,
                      }}>
                        <Text type="bold" additionalStyles="f7 blue mr2">
                          {t(`behaviours.${item.uid}`, translation)}
                        </Text>
                        <Emoji name={item.emoji} style={{ fontSize: 12 }} />
                      </TouchableOpacity>}
                    />
                </TouchableWithoutFeedback>
                </ScrollView>
              </ScrollView>
            </Animatable.View>
          </Fragment>
        )}

    </View>
  }
}
export default wrap(ViewHuman)
