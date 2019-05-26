import React, { PureComponent, Fragment } from 'react'
import { wrap } from "react-native-style-tachyons"
import { t } from 'utils/translation'
import Form from './Form'
import { NavigationEvents } from 'react-navigation'

class ProfileHuman extends PureComponent {
  _editName = (payload) => this.props.setName(payload)
  _editPicture = (payload) => this.props.setPicture(payload)

  render() {
    const { translation, navigation, formData, addProfile, updateProfile, checkInComplete, setAsCurrent } = this.props
    const profileId = navigation.getParam('id', '')
    const profilePicture = navigation.getParam('picture', null)
    const profileName = navigation.getParam('name', null)
    return <Fragment>
      {profileId !== '' && <NavigationEvents
        onDidFocus={payload => {
          this._editName(profileName)
          this._editPicture(profilePicture)
        }}
      />}
      <Form
        translation={translation}
        values={{
          name: formData ? formData.name : null,
          picture: formData ? formData.picture : null,
        }}
        editName={this._editName}
        editPicture={this._editPicture}
        onSubmit={() => {
          if (profileId === '') {
            let newProfileId = Date.now()
            addProfile({
              id: newProfileId,
              name: formData.name,
              picture: formData.picture,
            })
            if (checkInComplete === true) {
              navigation.navigate('ScreenProfilesSaved')
            } else {
              setAsCurrent(newProfileId)
              navigation.navigate('ScreenFormProfileAnimal')
            }
          } else {
            updateProfile({
              id: profileId,
              name: formData.name,
              picture: formData.picture,
            })
            navigation.navigate('ScreenProfilesSaved')
          }
          this._editName(null)
          this._editPicture(null)
        }
        }
      />

    </Fragment>

  }
}
export default wrap(ProfileHuman)