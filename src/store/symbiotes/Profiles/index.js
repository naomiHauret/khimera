import { createSymbiote } from 'redux-symbiote'

//
// Handles humans & animals profiles

const initialState = {
  humans: { },
  animals: { },
  currentAnimal: null,
  currentHuman: null,
}

const symbiotes = {
  // set current animal profile
  setCurrentAnimal: (state, payload) => ({
    ...state,
    currentAnimal: payload,
  }),
  // set current human profile
  setCurrentHuman: (state, payload) => ({
    ...state,
    currentHuman: payload,
  }),
  // Add a human profile
  addHuman: (state, payload) => {
    return {
      ...state,
      humans: {
        ...state.humans,
        [payload.id]: {
          name: payload.name,
          picture: payload.picture,
        }
      }
    }
  },
  // Update a human profile
  updateHuman: (state, payload) => {
    return {
      ...state,
      humans: {
        ...state.humans,
        [payload.id]: {
          name: payload.name,
          picture: payload.picture,
        }
      }
    }
  },
  // Remove a human profile
  removeHuman: (state, payload) => {
    const newHumansList = {}
    Object.keys(state.humans).reduce((object, key) => {
      if (key !== payload) {
        newHumansList[key] = state.humans[key]
      }
    }, {})

    return {
      ...state,
      humans: newHumansList,
    }
  },
  // Add an animal profile
  addAnimal: (state, payload) => {
    return {
      ...state,
      animals: {
        ...state.animals,
        [payload.id]: {
          species: payload.species,
          name: payload.name,
          picture: payload.picture,
        }
      }
    }
  },
  // Update an animal profile
  updateAnimal: (state, payload) => {
    return {
      ...state,
      animals: {
        ...state.humans,
        [payload.id]: {
          species: payload.species,
          name: payload.name,
          picture: payload.picture,
        }
      }
    }
  },
  // Remove an animal profile
  removeAnimal: (state, payload) => {
    const newAnimalsList = {}
    Object.keys(state.animals).reduce((object, key) => {
      if (key !== payload) {
        newAnimalsList[key] = state.animals[key]
      }
    }, {})

    return {
      ...state,
      animals: newAnimalsList,
    }
  },
}


export const { actions, reducer: profilesReducer } = createSymbiote(initialState, symbiotes, 'app/profiles')