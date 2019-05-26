import { combineReducers } from 'redux'
import { initializationReducer as initialization } from 'store/symbiotes/Initialization'
import { translationReducer as translation } from 'store/symbiotes/Translation'
import { toastrReducer as toastr } from 'store/symbiotes/Toastr'
import { profilesReducer as profiles } from 'store/symbiotes/Profiles'
import { formsReducer as forms } from 'store/symbiotes/Forms'

export const rootReducer = combineReducers({
  initialization,
  translation,
  profiles,
  toastr,
  forms,
})