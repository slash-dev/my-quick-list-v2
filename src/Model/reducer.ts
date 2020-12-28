import { combineReducers } from 'redux'
import { firebaseReducer, FirebaseReducer } from 'react-redux-firebase'

interface UserProfile {
  userId: string
  email: string
}

interface Recipe {
  category: string
  description: string,
  group: string,
}

interface Schema {
  recipes: Recipe
}

export interface RootState {
  firebase: FirebaseReducer.Reducer<UserProfile, Schema>
}

export const rootReducer = combineReducers<RootState>({
  firebase: firebaseReducer
})