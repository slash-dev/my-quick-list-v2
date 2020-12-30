import 'firebase/firestore';
import { connect } from "react-redux";
import {
  isLoaded, isEmpty, firestoreConnect, ExtendedFirestoreInstance
} from 'react-redux-firebase'
import {
  CircularProgress, Button, TableContainer,
  Table, TableBody, TableRow, TableCell
} from '@material-ui/core';
import { Recipe, RootState } from '../../Model/reducer';
import { compose } from "redux";
import { NavLink } from 'react-router-dom';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Chip from '@material-ui/core/Chip';

function RecipesList({ recipes, firestore }: { recipes: Recipe[], firestore: ExtendedFirestoreInstance }) {
  if (!isLoaded(recipes)) {
    return <CircularProgress />
  }
  if (isEmpty(recipes)) {
    return <p>Recipes list is empty</p>
  }
  const deleteRecipe = (id: string) => {
    firestore.delete({ collection: 'recipes', doc: id })
  }
  return <div>
    <TableContainer>
      <Table>
        <TableBody>
          {recipes.map((recipe: Recipe) =>
            <TableRow key={recipe.id}>
              <TableCell>
                <Button aria-label={recipe.title} component={NavLink} to={'/recipes/show/' + recipe.id}>
                  {recipe.title}
                </Button>
                <br />
                {recipe.tags?.map(tag =>
                  <Chip key={tag} variant="outlined" label={tag} color="primary" size="small" style={{ margin: '2px' }} />
                )}
              </TableCell>
              <TableCell align="right" padding="none">
                <Button aria-label="Remove" onClick={() => deleteRecipe(recipe.id)}>
                  Remove
                          <DeleteForeverIcon />
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
}

export default compose(
  connect(({ firebase }: RootState) => {
    return ({
      profile: firebase.profile
    });
  }),
  firestoreConnect((props: any) => {
    if (!isLoaded(props.profile) || isEmpty(props.profile)) {
      return [];
    }
    return [{
      collection: 'recipes',
      orderBy: [['title', 'asc']],
      where: ['group', '==', props.profile.currentGroupId],
    }]
  }),
  connect(({ firestore }: RootState) => {
    return ({
      recipes: firestore.ordered.recipes as Recipe[]
    });
  })
)(RecipesList) as React.ComponentType