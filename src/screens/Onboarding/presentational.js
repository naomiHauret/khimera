import React, { PureComponent, Fragment } from "react"
import { View, Animated, Dimensions, Easing } from "react-native"
import Frame from "components/presentationals/Frame"
import Heading from "components/presentationals/Heading"
import Text from "components/presentationals/Text"
import Paragraph from "components/presentationals/Paragraph"
import Illustration from "components/presentationals/Illustration"
import Button from "components/presentationals/Button"
import { wrap } from "react-native-style-tachyons"
import { t } from "utils/translation"
import { Transition } from "react-navigation-fluid-transitions"
import GestureRecognizer from "react-native-swipe-gestures"

class Onboarding extends PureComponent {
  state = {
    moveAnimation: new Animated.Value(0),
    current: 0,
    position: 0,
    readAll: false,
    steps: [
      null,
      {
        src: <Illustration src={require("./../../../assets/images/profiles.png")} />,
        scaleAnimation: new Animated.Value(0.85),
        opacityAnimation: new Animated.Value(0),
        textParallaxAnimation: new Animated.Value(20),
      },
      {
        src: <Illustration src={require("./../../../assets/images/emotion.png")} />,
        scaleAnimation: new Animated.Value(0.85),
        opacityAnimation: new Animated.Value(0),
        textParallaxAnimation: new Animated.Value(20),
      },
      {
        src: <Illustration src={require("./../../../assets/images/translate.png")} />,
        scaleAnimation: new Animated.Value(0.85),
        opacityAnimation: new Animated.Value(0),
        textParallaxAnimation: new Animated.Value(20),
      },
      {
        src: <Illustration src={require("./../../../assets/images/learn.png")} />,
        scaleAnimation: new Animated.Value(0.85),
        opacityAnimation: new Animated.Value(0),
        textParallaxAnimation: new Animated.Value(20),
      },
      {
        src: <Illustration src={require("./../../../assets/images/data.png")} />,
        scaleAnimation: new Animated.Value(0.85),
        opacityAnimation: new Animated.Value(0),
        textParallaxAnimation: new Animated.Value(20),
      },
    ],
  }

  constructor(props) {
    super(props)
    this._checkShowOnboarding() // check screen validity before screen is mounted
  }

  // change screen if user already saw/skipped onboarding
  _checkShowOnboarding = () => {
    this.props.showOnboarding === false && this.props.navigation.navigate("Permissions")
  }

  // go to next onboarding step
  _goToNextStep = () => {
    if (this.state.current === 0) {
      this.setState(
        {
          current: this.state.current + 1,
        },
        () =>
          Animated.parallel([
            Animated.timing(this.state.steps[this.state.current].scaleAnimation, {
              toValue: 1,
              duration: 450,
              useNativeDriver: true,
            }),
            Animated.timing(this.state.steps[this.state.current].opacityAnimation, {
              toValue: 1,
              duration: 650,
              useNativeDriver: true,
            }),
            Animated.timing(this.state.steps[this.state.current].textParallaxAnimation, {
              toValue: 0,
              duration: 350,
              useNativeDriver: true,
            }),
          ]).start(),
      )
    } else {
      this.setState(
        {
          current: this.state.current + 1,
          position: this.state.position - (Dimensions.get("window").width - 20),
        },
        () =>
          Animated.parallel([
            Animated.timing(this.state.moveAnimation, {
              toValue: this.state.position,
              duration: 250,
              useNativeDriver: true,
            }),
            Animated.timing(this.state.steps[this.state.current].scaleAnimation, {
              toValue: 1,
              duration: 450,
              useNativeDriver: true,
            }),
            Animated.timing(this.state.steps[this.state.current].opacityAnimation, {
              toValue: 1,
              duration: 650,
              useNativeDriver: true,
            }),
            Animated.timing(this.state.steps[this.state.current].textParallaxAnimation, {
              toValue: 0,
              duration: 350,
              useNativeDriver: true,
            }),
          ]).start(() => this.state.current === 5 && this.setState({ readAll: true })),
      )
    }
  }

  // go to previous onboarding step
  _goToPreviousStep = () => {
    this.setState(
      {
        current: this.state.current - 1,
        position: this.state.position + (Dimensions.get("window").width - 20),
      },
      () =>
        Animated.timing(this.state.moveAnimation, {
          toValue: this.state.position,
          duration: 250,
          useNativeDriver: true,
        }).start(),
    )
  }

  // on left swipe gesture, go to next onboarding step
  _onSwipeLeft(gestureState) {
    this.state.current > 0 && this.state.current < 5 && this._goToNextStep()
  }

  // on right swipe gesture, go to previous onboarding step
  _onSwipeRight(gestureState) {
    this.state.current > 1 && this._goToPreviousStep()
  }

  render() {
    const { translation, navigation, hideOnboarding } = this.props
    const { current, steps, readAll } = this.state
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    }

    return (
      <GestureRecognizer
        onSwipeLeft={(state) => this._onSwipeLeft(state)}
        onSwipeRight={(state) => this._onSwipeRight(state)}
        config={config}
        style={{
          flex: 1,
          backgroundColor: this.state.backgroundColor,
        }}
      >
        <Frame theme="colorful">
          <Transition disappear="horizontal" appear="horizontal">
            <View cls="flx-i">
              {current === 0 ? (
                <Fragment>
                  <Heading margins="mb3">{t("screens.onboarding.welcome", translation)}</Heading>
                  <Paragraph additionalStyles="f7 mb3">{t("screens.onboarding.wantToOnboard", translation)}</Paragraph>
                  <View cls="flx-i pb2">
                    <Illustration src={require("./../../../assets/images/intro.png")} />
                  </View>
                </Fragment>
              ) : (
                <Animated.View
                  style={{
                    transform: [
                      {
                        translateX: this.state.moveAnimation,
                      },
                    ],
                  }}
                  cls="flx-row flx-i"
                >
                  {steps.map(
                    (step, index) =>
                      index !== 0 && (
                        <View key={index}>
                          <Animated.View
                            style={{
                              transform: [
                                {
                                  translateX: steps[index].textParallaxAnimation,
                                },
                              ],
                              opacity: steps[index].opacityAnimation,
                            }}
                          >
                            <Heading margins="mb3">
                              {t(`screens.onboarding.steps.num${index - 1}`, translation)}
                            </Heading>
                          </Animated.View>
                          <Animated.View
                            cls="flx-i"
                            style={{
                              transform: [
                                {
                                  scale: steps[index].scaleAnimation,
                                },
                              ],
                              opacity: steps[index].opacityAnimation,
                            }}
                          >
                            {steps[index].src}
                          </Animated.View>
                        </View>
                      ),
                  )}
                </Animated.View>
              )}
              <View cls="flx-row jcsb aic mv2 ph2 mta">
                <View cls="flx-i mr2">
                  <Button
                    handleOnPress={() => {
                      hideOnboarding()
                      navigation.navigate("Permissions")
                    }}
                    align="center"
                    theme="pill"
                    muted={false}
                  >
                    {current === 5 || readAll === true ? t("labels.start", translation) : t("labels.skip", translation)}
                  </Button>
                </View>
                <View cls="flx-i ml2">
                  {current <= 0 ? (
                    <Button handleOnPress={this._goToNextStep} align="center" theme="pill" muted={false}>
                      {t("labels.discoverApp", translation)}
                    </Button>
                  ) : (
                    <View cls="flx-row aife">
                      {steps.map(
                        (step, index) =>
                          index !== 0 && (
                            <View
                              key={index}
                              style={{
                                width: index === current ? 12 : 6,
                                height: index === current ? 12 : 6,
                              }}
                              cls={`br5 mh2 bg_yellow_600 ${index === current ? "o-100" : "o-40"}`}
                            />
                          ),
                      )}
                    </View>
                  )}
                </View>
              </View>
            </View>
          </Transition>
        </Frame>
      </GestureRecognizer>
    )
  }
}

export default Onboarding
