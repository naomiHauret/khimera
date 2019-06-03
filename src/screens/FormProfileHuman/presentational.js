import React, { PureComponent, Fragment } from "react"
import { wrap } from "react-native-style-tachyons"
import { t } from "utils/translation"
import Form from "./Form"
import { NavigationEvents } from "react-navigation"
import * as Animatable from "react-native-animatable"

class ProfileHuman extends PureComponent {
  constructor(props) {
    super(props)
    this._checkInitializationStep()
  }

  // change screen if check in isn't complete but human profile already registered
  _checkInitializationStep = () => {
    const { checkInComplete, isHumanProfileAlreadyRegistered, navigation, animalAlreadyRegistered } = this.props
    const profile = navigation.getParam("id", "")
    if (
      checkInComplete === false &&
      isHumanProfileAlreadyRegistered === true &&
      animalAlreadyRegistered === false &&
      profile === ""
    ) {
      navigation.navigate("ScreenFormProfileAnimal")
    }
  }

  _editName = (payload) => this.props.setName(payload)
  _editPicture = (payload) => this.props.setPicture(payload)

  render() {
    const {
      translation,
      navigation,
      formData,
      addProfile,
      updateProfile,
      animalAlreadyRegistered,
      isHumanProfileAlreadyRegistered,
      setAsCurrent,
    } = this.props

    return (
      <Fragment>
        <NavigationEvents
          onWillFocus={(payload) => {
            if (navigation.getParam("id", "") !== "") {
              this._editName(navigation.getParam("name", null))
              this._editPicture(navigation.getParam("picture", null))
            }
          }}
          onWillBlur={() => {
            this._editName(null)
            this._editPicture(null)
          }}
        />
        <Animatable.View cls="flx-i" animation="fadeIn">
          <Form
            shouldDisplayBack={isHumanProfileAlreadyRegistered}
            translation={translation}
            values={{
              name: formData ? formData.name : null,
              picture: formData ? formData.picture : null,
            }}
            editName={this._editName}
            editPicture={this._editPicture}
            onSubmit={() => {
              if (navigation.getParam("id", "") === "") {
                let newProfileId = Date.now()
                addProfile({
                  id: newProfileId,
                  name: formData.name,
                  picture: formData.picture,
                })
                this._editName(null)
                this._editPicture(null)
                if (animalAlreadyRegistered === true) {
                  navigation.navigate("ScreenProfiles")
                } else {
                  setAsCurrent(newProfileId)
                  navigation.navigate("ScreenFormProfileAnimal")
                }
              } else {
                updateProfile({
                  id: navigation.getParam("id", ""),
                  name: formData.name,
                  picture: formData.picture,
                })
                this._editName(null)
                this._editPicture(null)
                navigation.navigate("ScreenProfilesSaved")
              }
            }}
          />
        </Animatable.View>
      </Fragment>
    )
  }
}
export default wrap(ProfileHuman)
