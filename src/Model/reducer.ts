import { combineReducers } from 'redux'
import { firebaseReducer, FirebaseReducer, FirestoreReducer, firestoreReducer } from 'react-redux-firebase'

interface UserProfile {
  userId: string
  email: string
}

interface Ingredient {
  name: string,
  quantity: number,
  unit: string,
}

interface Recipe {
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
  firebase: FirebaseReducer.Reducer<UserProfile, Schema>
  firestore: FirestoreReducer.Reducer
}

export const rootReducer = combineReducers<RootState>({
  firebase: firebaseReducer,
  firestore: firestoreReducer
})