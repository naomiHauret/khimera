import { createStore, compose, applyMiddleware } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage" // defaults to localStorage for web and AsyncStorage for react-native
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"
import { rootReducer as reducer } from "store/symbiotes"

const persistConfig = {
  timeout: 0,
  key: "root",
  storage: storage,
  blacklist: ["navigation", "toastr"],
  stateReconciler: autoMergeLevel2,
}

const middlewares = []
const enhancer = composeWithDevTools({
})(applyMiddleware(...middlewares))
const persistedReducer = persistReducer(persistConfig, reducer)

export const store = createStore(persistedReducer, {}, enhancer)
export const persistor = persistStore(store)
