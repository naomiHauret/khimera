import { createSymbiote } from "redux-symbiote"

//
// Handles humans & animals profiles

const initialState = {
  humans: {},
  animals: {},
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
          mood: null,
        },
      },
    }
  },
  // Update a human profile data
  updateHuman: (state, payload) => {
    return {
      ...state,
      humans: {
        ...state.humans,
        [payload.id]: {
          ...state.humans[payload.id],
          name: payload.name,
          picture: payload.picture,
        },
      },
    }
  },
  // Update a human mood
  updateHumanMood: (state, payload) => {
    return {
      ...state,
      humans: {
        ...state.humans,
        [payload.id]: {
          ...state.humans[payload.id],
          mood: [
            ...state.humans[payload.id].mood,
            {
              date: Date.now(),
              uid: payload.mood,
            }
          ],        },
      },
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
          decoyModel: payload.decoyModel,
          name: payload.name,
          picture: payload.picture,
          mood: null,
        },
      },
    }
  },
  // Update an animal profile data
  updateAnimal: (state, payload) => {
    return {
      ...state,
      animals: {
        ...state.animals,
        [payload.id]: {
          ...state.animals[payload.id],
          name: payload.name,
          picture: payload.picture,
        },
      },
    }
  },
  // Update an animal mood
  updateAnimalMood: (state, payload) => {
    return {
      ...state,
      animals: {
        ...state.animals,
        [payload.id]: {
          ...state.animals[payload.id],
          mood: [
              ...state.animals[payload.id].mood,
              {
                date: Date.now(),
                uid: payload.mood,
              }
            ],
        },
      },
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

export const { actions, reducer: profilesReducer } = createSymbiote(initialState, symbiotes, "app/profiles")
