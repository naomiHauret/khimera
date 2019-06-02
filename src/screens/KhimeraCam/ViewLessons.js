import React, { PureComponent, Fragment } from "react"
import { View, WebView, Dimensions, TouchableOpacity, Linking } from "react-native"
import { wrap } from "react-native-style-tachyons"
import { t } from "utils/translation"
import PropTypes from "prop-types"
import * as Animatable from "react-native-animatable"
import Text from "components/presentationals/Text"
import Heading from "components/presentationals/Heading"
import Paragraph from "components/presentationals/Paragraph"
import { DateTime } from "luxon"
import Swiper from "react-native-swiper"
import { BlurView } from "expo"
import Button from "components/presentationals/Button"
import { lessons } from "utils/lessons"
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons"

class ViewLessons extends PureComponent {
  render() {
    const { translation, navigation, animalName, freeLessonTaken, takeFreeLesson } = this.props

    return (
      <Animatable.View
        style={{
          position: "relative",
          backgroundColor: "#EBF0F5",
          height: Dimensions.get("window").height,
          width: Dimensions.get("window").width,
        }}
        cls="flx-i"
        easing="ease-out-quart"
        animation="fadeInUpBig"
        duration={650}
      >
        <Animatable.View
          style={{
            position: "relative",
          }}
          cls="flx-i"
          easing="ease-out-quart"
          animation="fadeInUp"
          duration={350}
          delay={1500}
        >
          <WebView
            source={{
              html: `
            <div id="hideControls" style="
              width: ${Dimensions.get("window").width};
              height: 70px;
              position: fixed;
              bottom: 0;
              left: 0;
              z-index: 5;
            "></div>
            <iframe
              style="
              margin: 0;
              padding: 0;
              position: absolute;
              top: -50px;
              left: 0;
              overflow: hidden;
              width: ${Dimensions.get("window").width};
              height: ${Dimensions.get("window").height + 130};
              display: block;"
              id="api-frame"
              frameborder="0" allow="autoplay; fullscreen; vr" mozallowfullscreen="true" webkitallowfullscreen="true">
            </iframe>
            <script type="text/javascript" src="https://static.sketchfab.com/api/sketchfab-viewer-1.5.1.js"></script>
            <script type="text/javascript">
              const iframe = document.querySelector('#api-frame')
              const uid = '565b12215f164be8b61d06dd9a1987d7'
              // By default, the latest version of the viewer API will be used.
              const client = new Sketchfab( iframe )

              client.init( uid, {
                  success:  ( api ) => {
                      api.start()
                      api.addEventListener( 'viewerready', () => {
                          document.querySelector('#hideControls').style.backgroundImage = 'linear-gradient(to bottom, #EBF0F5, #cdd3d8)'
                          api.setFov(39)
                          api.setCycleMode('loopOne')
                          api.setCurrentAnimationByUID("9cd9dd4212f74786bb4d3c0e78638429")
                      } )
                  }
              } )
              </script>
          `,
            }}
          />
          <View
            cls="absolute"
            style={{
              bottom: 60,
              left: 0,
              elevation: 15,
              width: Dimensions.get("window").width,
              minHeight: Dimensions.get("window").height * 0.6,
              paddingHorizontal: 20,
            }}
          >
            <Swiper loop={false} showsPagination={false} index={0} cls="flx-i">
              {lessons.map((lesson, k) => (
                <BlurView tint="light" intensity={100} key={k} cls="pa3 br4 flx-i mr2">
                  <Heading additionalStyles="mt3">{t(`lessons.${lesson.uid}.label`, translation)}</Heading>
                  <Paragraph additionalStyles="mt2 mb3 pb2">
                    {t(`lessons.${lesson.uid}.text`, translation, { name: animalName })}
                  </Paragraph>
                  <View cls="aic jcc">
                    {freeLessonTaken === lesson.uid ? (
                      <MaterialCommunityIcons size={80} cls="blue" name="comment-check-outline" />
                    ) : (
                      <FontAwesome
                        size={80}
                        cls="blue"
                        name={lesson.uid !== null && lesson.canBeFree === true ? "unlock-alt" : "lock"}
                      />
                    )}
                    <Text type="italic">
                      {freeLessonTaken === lesson.uid
                        ? t("lessons.ongoingLesson", translation, { name: animalName })
                        : freeLessonTaken === null && lesson.canBeFree === true
                        ? t("lessons.offerFreeLesson", translation, { name: animalName })
                        : freeLessonTaken !== null && lesson.canBeFree === true
                        ? t("lessons.alreadyTakenFreeLesson", translation, { name: animalName })
                        : t("lessons.lessonPackPremium", translation, { name: animalName })}
                    </Text>
                  </View>
                  <View cls="mta">
                    {freeLessonTaken !== lesson.uid && (
                      <Button
                        handleOnPress={() =>
                          lesson.canBeFree === false || (freeLessonTaken !== null && lesson.canBeFree === true)
                            ? Linking.openURL("https://parlezvousbestial.now.sh")
                            : takeFreeLesson(lesson.uid)
                        }
                      >
                        {lesson.canBeFree === false || (freeLessonTaken !== null && lesson.canBeFree === true)
                          ? t("labels.goPremium", translation)
                          : t("labels.startBehaviourCorrection", translation)}
                      </Button>
                    )}
                  </View>
                </BlurView>
              ))}
            </Swiper>
          </View>
        </Animatable.View>
      </Animatable.View>
    )
  }
}

export default wrap(ViewLessons)

// comportement (réflexion)
// indices vocaux
// posture
