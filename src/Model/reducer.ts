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

export interface GroupMemberInfo {
  name: string,
}

export interface Group {
  id?: string,
  name: string
  // The actual name of the creator.
  owner: string
  // The uid of the creator.
  ownerId: string
  // The key is the user email.
  members: { [key: string]: GroupMemberInfo },
}

interface Schema {
  recipes: Recipe
}

export interface Profile {
  name: string,
  groups: string[],
  currentGroupId: string,
}

export interface PopulatedProfile {
  name: string,
  groups: Group[],
  currentGroupId: string,
  currentGroup: Group,
}

export interface RootState {
  firebase: FirebaseReducer.Reducer<Profile, Schema>
  firestore: FirestoreReducer.Reducer
}

export const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
})