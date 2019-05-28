import React, { PureComponent, Fragment } from "react"
import { View, Dimensions } from 'react-native'
import { wrap } from "react-native-style-tachyons"
import { t } from "utils/translation"
import { WebView } from 'react-native'
import PropTypes from 'prop-types'


class ViewAnimal extends PureComponent {
  static defaultProps = {
    mood: 'default'
  }
  render() {
    const { translation, navigation, mood } = this.props
    const moodsAnimations = {
      default: "142a16f3ff6c42cf94dfaaa9b5ba5c05",
      angry: "fc47c439447349debc5a171da570c34f",
      irritated: "790aa27bf5f54889a62d5471254ce954",
      unsafe: "790aa27bf5f54889a62d5471254ce954",
      nervous: "790aa27bf5f54889a62d5471254ce954",
      happy: "28a51b27ce2e4948a821638213bbbc94",
      excited: "28a51b27ce2e4948a821638213bbbc94",
      bored: "7a824b70674e4f4abc140658ac4232a6",
      relaxed: "9d3d7d7a393a48d6a6a6e88f2ae18079",
      calm: "9d3d7d7a393a48d6a6a6e88f2ae18079",
      hungry: "9e372a0e02554758b17263d6c36cd2cf",
    }
    return (
      <View cls="flx-i" style={{position: 'relative'}}>
        <WebView
          source={{ html: `
            <iframe
              style="
              margin: 0;
              padding: 0;
              position: absolute;
              top: -50px;
              left: 0;
              width: ${Dimensions.get('window').width};
              pointer-events: none;
              height: ${Dimensions.get('window').height + 130};
              display: block;"
              id="api-frame"
              frameborder="0" allow="autoplay; fullscreen; vr" mozallowfullscreen="true" webkitallowfullscreen="true">
            </iframe>
            <script type="text/javascript" src="https://static.sketchfab.com/api/sketchfab-viewer-1.5.1.js"></script>
            <script type="text/javascript">
              const iframe = document.querySelector('#api-frame')
              const uid = 'c1bc225171774312a05f17f41244bec7'
              // By default, the latest version of the viewer API will be used.
              const client = new Sketchfab( iframe )

              client.init( uid, {
                  success: function onSuccess( api ){
                      api.start()
                      api.addEventListener( 'viewerready', () => {
                          api.setFov(1.75)
                          api.setCycleMode('loopOne')
                          api.setCurrentAnimationByUID("${moodsAnimations[mood]}")

                      } )
                  }
              } )
              </script>
          ` }}
        />
      </View>
    )
  }
}

export default wrap(ViewAnimal)
