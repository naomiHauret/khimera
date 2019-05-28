import React, { PureComponent, Fragment } from "react"
import { wrap } from "react-native-style-tachyons"
import { t } from "utils/translation"
import Form from "./Form"
import { NavigationEvents } from "react-navigation"

class ProfileAnimal extends PureComponent {
  constructor(props) {
    super(props)
    this._checkInitializationStep()
  }

  // change screen if check in isn't complete but human profile already registered
  _checkInitializationStep = () => {
    const { checkInComplete, isAnimalProfileAlreadyRegistered, navigation } = this.props
    const profile = navigation.getParam("id", "")

    if (checkInComplete === false && isAnimalProfileAlreadyRegistered === true && profile === "") {
      navigation.navigate("ScreenProfiles")
    }
  }

  _editName = (payload) => this.props.setName(payload)
  _editPicture = (payload) => this.props.setPicture(payload)

  render() {
    const { isAnimalProfileAlreadyRegistered, translation, navigation, formData, addProfile, updateProfile, checkInComplete, setAsCurrent } = this.props
    const profile = navigation.getParam("id", "")
    return <Fragment>
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
      <Form
        navigation={navigation}
        shouldDisplayBack={isAnimalProfileAlreadyRegistered}
        translation={translation}
        values={{
          name: formData ? formData.name : null,
          picture: formData ? formData.picture : null,
          species: formData ? formData.species : null,
          decoyModel: formData ? formData.decoyModel : null,
        }}
        editName={this._editName}
        editPicture={this._editPicture}
        onSubmit={() => {
          if (profile === "") {
            let id = Date.now()
            addProfile({
              id,
              name: formData.name,
              species: formData.species,
              decoyModel: formData.decoyModel,
              picture: formData.picture,
            })
            if (checkInComplete !== true) {
              setAsCurrent(id)
            }
            this._editName(null)
            this._editPicture(null)
            navigation.navigate("ScreenProfiles")
          } else {
            updateProfile({
              id: profile,
              name: formData.name,
              picture: formData.picture,
            })
            this._editName(null)
            this._editPicture(null)
            navigation.navigate("ScreenProfilesSaved")
          }
        }}
      />

    </Fragment>
  }
}
export default wrap(ProfileAnimal)
