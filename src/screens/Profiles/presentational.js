import React, { PureComponent, Fragment } from 'react'
import Illustration from 'components/presentationals/Illustration'
import Text from 'components/presentationals/Text'
import Frame from 'components/presentationals/Frame'
import Heading from 'components/presentationals/Heading'
import Paragraph from 'components/presentationals/Paragraph'
import Button from 'components/presentationals/Button'
import { wrap } from "react-native-style-tachyons"
import { t } from 'utils/translation'
import { View, ScrollView, TouchableOpacity, Image, Alert, Linking } from 'react-native'
import { COLOR_GREY_100 } from 'utils/designSystem'
import { MaterialIcons, MaterialCommunityIcons, Feather } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable-unmountable'
import { NavigationEvents } from 'react-navigation'


class Profiles extends PureComponent {
  state = {
    selected: null
  }

  constructor(props) {
    super(props)
    this._checkProfiles()
  }

  // change screen if we don't have animal and humans profiles
  _checkProfiles = () => {
    if (Object.keys(this.props.humans).length === 0) {
      this.props.navigation.navigate("ScreenFormProfileHuman")
    } else if (Object.keys(this.props.animals).length === 0) {
      this.props.navigation.navigate("ScreenFormProfileAnimal")
    }
  }

  _setSelected = (id) => this.setState({ selected: id })

  render() {
    const { isCheckInCompleted, completeCheckIn, removeAnimalProfile, removeHumanProfile, translation, navigation, humans, animals, setAsCurrentHuman, setAsCurrentAnimal } = this.props
    const humansList = Object.keys(humans)
    const animalsList = Object.keys(animals)
    return <Fragment>
      <NavigationEvents
        onDidFocus={payload => isCheckInCompleted === false && completeCheckIn()}
      />
      <Frame theme="clear">
        <Text type="italic" additionalStyles="grey-200 tac">
          {t('screens.profiles.longClicktoAction', translation)}
      </Text>
      <Heading margins="mt3 mb4">
          {t('labels.humansProfilesSaved', translation)}
      </Heading>
        <ScrollView horizontal={true} cls="flx-i">
      <TouchableOpacity onPress={
        () => navigation.navigate('ScreenFormProfileHuman')
      }
      cls="mr4 aic jcc" style={{
        width: 115,
        height: 115,
        borderWidth: 3,
        borderStyle: "solid",
        borderRadius: 12,
        borderStyle: "dashed",
        borderColor: COLOR_GREY_100,
      }}>
        <MaterialIcons name="add" cls="grey-100" size={25} />
      </TouchableOpacity>
          {humansList.map(human => <View key={human} cls="mr2" style={{
            position: 'relative',  overflow: "visible", width: 115,
            height: 115,}}>
          <TouchableOpacity
              onPress={()=>setAsCurrentHuman(human)}
              onLongPress={() => this._setSelected(human)}
              key={human}>
              <Image
                style={{
                  width: 115,
                  height: 115,
                  resizeMode: "cover",
                  borderRadius: 12,
                }}
                source={{ uri: humans[human].picture }}
              />
              <Text additionalStyles="f6" type="bold">{humans[human].name}</Text>
          </TouchableOpacity>
          {this.state.selected === human && <Animatable.View cls="flxdr absolute aic jcc" style={{
            bottom: -75,
            left: 0,
            width: 115,
          }} animation="bounceIn">
              <TouchableOpacity
                onPress={() => navigation.navigate('ScreenFormProfileHuman', {
                  id: human,
                  name: humans[human].name,
                  picture: humans[human].picture,
            })}
                cls={`bg-yellow-200 br5 pa2 ${humans.length > 1  ? "mr2" : ""}`}>
                <Feather name="edit-2" size={23} cls="black" />
              </TouchableOpacity>
              {humans.length > 1 && <TouchableOpacity
                onPress={() => Alert.alert(
                  t('labels.deleteProfile', translation),
                  t('labels.doYouReallyWantToDeleteThisProfile', translation, { name: humans[human].name }),
                  [
                    { text: t('labels.yesDelete', translation), onPress: () => removeHumanProfile(human) },
                    {
                      text: t('labels.cancel', translation),
                      style: 'cancel',
                    },
                  ],
                  { cancelable: false },
                )}
                cls="bg-white br5 pa2 ba"
                style={{
                  borderColor: COLOR_GREY_100
                }}
              >
                <MaterialCommunityIcons name="delete-outline" size={23} cls="grey-200" />
              </TouchableOpacity>}

            </Animatable.View>}
        </View>
      )}
      </ScrollView>
        <Heading margins="mt3 mb4">
          {t('labels.animalsProfilesSaved', translation)}
        </Heading>
      <ScrollView horizontal={true} cls="flx-i mt4">
          <TouchableOpacity
            onPress={() => Alert.alert(
              t('labels.addNewAnimalProfile', translation),
              t('labels.goPremiumToAddNewAnimal', translation),
              [
                {
                  text: t('labels.goPremium', translation),
                  onPress: () => Linking.openURL("https://parlezvousbestial.now.sh")
                },
                {
                  text: t('labels.cancel', translation),
                  style: 'cancel',
                },
              ],
              { cancelable: false },
            )}
            cls="mr4 aic jcc" style={{
            width: 115,
            height: 115,
            borderWidth: 3,
            borderStyle: "solid",
            borderRadius: 12,
            borderStyle: "dashed",
            borderColor: COLOR_GREY_100,
          }}>
            <MaterialIcons name="add" cls="grey-100" size={25} />
          </TouchableOpacity>
          {animalsList.map(animal => <View key={animal} cls="mr2" style={{
            position: 'relative', overflow: "visible", width: 115,
            height: 115,
          }}>
            <TouchableOpacity
              onPress={() => setAsCurrentAnimal(animal)}
              onLongPress={() => this._setSelected(animal)}
              key={animal}>
              <Image
                style={{
                  width: 115,
                  height: 115,
                  resizeMode: "cover",
                  borderRadius: 12,
                }}
                source={{ uri: animals[animal].picture }}
              />
              <Text additionalStyles="f6" type="bold">{animals[animal].name}</Text>
            </TouchableOpacity>
            {this.state.selected === animal && <Animatable.View cls="flxdr absolute aic jcc" style={{
              bottom: -75,
              left: 0,
              width: 115,
            }} animation="bounceIn">
              <TouchableOpacity
                onPress={() => navigation.navigate('ScreenFormProfileAnimal', {
                  id: animal,
                  name: animals[animal].name,
                  picture: animals[animal].picture,
                })}
                cls={`bg-yellow-200 br5 pa2 ${animals.length > 1 ? "mr2" : ""}`}>
                <Feather name="edit-2" size={23} cls="black" />
              </TouchableOpacity>
              {animals.length > 1 && <TouchableOpacity
                onPress={() => Alert.alert(
                  t('labels.deleteProfile', translation),
                  t('labels.doYouReallyWantToDeleteThisProfile', translation, { name: animals[animal].name }),
                  [
                    { text: t('labels.yesDelete', translation), onPress: () => removeAnimalProfile(animal) },
                    {
                      text: t('labels.cancel', translation),
                      style: 'cancel',
                    },
                  ],
                  { cancelable: false },
                )}
                cls="bg-white br5 pa2 ba"
                style={{
                  borderColor: COLOR_GREY_100
                }}
              >
                <MaterialCommunityIcons name="delete-outline" size={23} cls="grey-200" />
              </TouchableOpacity>}

            </Animatable.View>}
          </View>
          )}
        </ScrollView>
      <View>
      </View>
      </Frame>
    </Fragment>

  }
}

export default wrap(Profiles)