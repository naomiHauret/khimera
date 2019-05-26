import { createSymbiote } from 'redux-symbiote'

const initialState = {
  checkInComplete: false,
  permissionsGranted: false,
  internetConnection: false,
  showOnboarding: true,
  paired: false
}

const symbiotes = {
  // user completed check-in
  completeCheckIn: (state) => ({
    ...state,
    checkInComplete: true,
  }),

  // hide onboarding
  hideOnboarding: (state) => ({
    ...state,
    showOnboarding: false,
  }),

  // grant permissions
  grantPermissisons: (state) => ({
    ...state,
    permissionsGranted: true,
  }),

  // user completed check-in
  pairingDone: (state) => ({
    ...state,
    paired: true,
  }),
  // set user's device connection status (connected/disconnected)
  setInternetConnectionStatus: (state, payload) => ({
    ...state,
    internetConnection: payload,
  }),
}

export const { actions, reducer: initializationReducer } = createSymbiote(initialState, symbiotes, 'app/initialization')