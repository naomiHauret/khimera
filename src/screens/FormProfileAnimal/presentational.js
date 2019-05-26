import React, { PureComponent } from 'react'
import { wrap } from "react-native-style-tachyons"
import { t } from 'utils/translation'
import Form from './Form'

class ProfileAnimal extends PureComponent {
  _editName = (payload) => this.props.setName(payload)
  _editPicture = (payload) =>  this.props.setPicture(payload)

  render() {
    const { translation, navigation, formData, addProfile, updateProfile, checkInComplete, setAsCurrent } = this.props
    const profile = navigation.getParam('profileId', '')
    return <Form
        translation={translation}
        values={{
          name: formData ? formData.name : null,
          picture: formData ? formData.picture : null,
          species: formData ? formData.species : null,
        }}
        editName={this._editName}
        editPicture={this._editPicture}
        onSubmit={() => {
          if(profile === '') {
            let id = Date.now()
            addProfile({
              id,
              name: formData.name,
              species: formData.species,
              picture: formData.picture,
            })
            if (checkInComplete !== true) {
              setAsCurrent(id)
            }
          } else {
              updateProfile({
                id: profile,
                name: formData.name,
                picture: formData.picture,
                species: formData.species,
            })
          }
          this._editName(null)
          this._editPicture(null)
          navigation.navigate('ScreenProfilesSaved')
        }
      }
      />
  }
}
export default wrap(ProfileAnimal)