import { Route } from 'react-router-dom'
import RecipesList from './RecipiesList'

function Recipes() {
  return <div>
    <Route exact path="/recipes" render={() => <RecipesList />} />
  </div>;
}


export default Recipes;