import 'firebase/firestore';
import { connect } from "react-redux";
import {
  isLoaded, isEmpty, firestoreConnect
} from 'react-redux-firebase'
import { CircularProgress } from '@material-ui/core';
import { Recipe, RootState } from '../../Model/reducer';
import 'firebase/firestore'
import { compose } from "redux";

function RecipesList({ recipes }: { recipes: Recipe[] }) {
  if (!isLoaded(recipes)) {
    return <CircularProgress />
  }
  if (isEmpty(recipes)) {
    return <p>Recipes list is empty</p>
  }
  console.log(recipes);
  return <div>
    {recipes
      .map((recipe: Recipe) => (
        <p key={recipe.id} >{recipe.title}</p>
      ))}
  </div>
}

export default compose(
  firestoreConnect(() => [{
    collection: 'recipes',
    orderBy: [['title', 'asc']],
    // TODO: load current group from profile.
    where: ['group', '==', '1'],
  }]),
  connect((state: RootState) => {
    return ({
      recipes: state.firestore.ordered.recipes as Recipe[]
    });
  })
)(RecipesList) as React.ComponentType