import { combineReducers } from 'redux'
import { firebaseReducer, FirebaseReducer, FirestoreReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

interface Ingredient {
  name: string,
  quantity: number,
  unit: string,
}

export interface Recipe {
  id: string,
  title: string,
  numPeople: number,
  category: string,
  ingredients: Ingredient[],
  description: string,
  tags: string[],
  group: string,
}

interface Schema {
  recipes: Recipe
}

export interface RootState {
  firebase: FirebaseReducer.Reducer<{}, Schema>
  firestore: FirestoreReducer.Reducer
}

export const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
})