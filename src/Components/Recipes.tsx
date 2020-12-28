import React from "react";
import 'firebase/firestore';
import { Route } from 'react-router-dom'
import { useSelector } from "react-redux";
import {
  useFirestoreConnect, isLoaded, isEmpty
} from 'react-redux-firebase'
import { CircularProgress } from '@material-ui/core';
import { RootState } from '../Model/reducer';
import 'firebase/firestore'

function RecipesList() {
  useFirestoreConnect([
    { collection: 'recipes', where: ['group', '==', '1'] }
  ]);
  // Replacing by state.firestore doesn't compile.
  const recipes = useSelector((state: RootState) => state.firebase.ordered.recipes);
  if (!isLoaded(recipes)) {
    return <CircularProgress />
  }
  if (isEmpty(recipes)) {
    return <p>Recipes list is empty</p>
  }

  return <div>
    {recipes
      .map(({ value: recipe, key }) => (
        <p key={`${key}`} >{recipe.title}</p>
      ))}
  </div>
}

function Recipes() {
  return <div>
    <Route exact path="/recipes" render={() => <RecipesList />} />
  </div>;
}


export default Recipes;
