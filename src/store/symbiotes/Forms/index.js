import { createSymbiote } from "redux-symbiote"

//
// Handles humans & animals profiles

const initialState = {
  formAnimal: {
    species: "dog", // hardcoded because this is a POC. In an IRL app, this would depend on the associated DECOY model
    decoyModel: "KYUFORALL-Dog", // hardcoded because this is a POC.
    picture: null,
    name: null,
  },
  formHuman: {
    picture: null,
    name: null,
  },
}

const symbiotes = {
  // set animal species in animal profile form data
  setAnimalSpecies: (state, payload) => ({
    ...state,
    formAnimal: {
      ...state.formAnimal,
      species: payload,
    },
  }),
  // set animal name in animal profile form data
  setAnimalName: (state, payload) => ({
    ...state,
    formAnimal: {
      ...state.formAnimal,
      name: payload,
    },
  }),
  // set human name in human profile form data
  setHumanName: (state, payload) => ({
    ...state,
    formHuman: {
      ...state.formHuman,
      name: payload,
    },
  }),
  // set animal picture in animal profile form data
  setAnimalPicture: (state, payload) => ({
    ...state,
    formAnimal: {
      ...state.formAnimal,
      picture: payload,
    },
  }),
  // set human picture in human profile form data
  setHumanPicture: (state, payload) => ({
    ...state,
    formHuman: {
      ...state.formHuman,
      picture: payload,
    },
  }),
}

export const { actions, reducer: formsReducer } = createSymbiote(initialState, symbiotes, "app/forms")
