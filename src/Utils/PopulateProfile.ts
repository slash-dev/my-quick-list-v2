import { connect } from "react-redux";
import { firestoreConnect, FirestoreReducer, isEmpty, isLoaded, populate } from "react-redux-firebase";
import { compose } from "redux";
import { RootState } from "../Model/reducer";

export const profilePopulates = [
  { child: 'groups', root: 'groups' },
  { child: 'currentGroupId', root: 'groups', childAlias: 'currentGroup' }
]

function populateProfile(firestore: FirestoreReducer.Reducer) {
  const users = populate(firestore, "users", profilePopulates);
  if (!isLoaded(users)) {
    return users;
  }
  if (isEmpty(users)) {
    return undefined;
  }
  const values = Object.values(users);
  if (!values) {
    return undefined;
  }

  const profile: any = values[0];
  if (!profile) {
    return undefined;
  }
  return profile;
}

export const PopulateProfile = compose(
  firestoreConnect((props: any) => {
    return [{
      collection: "users",
      doc: props.firebase.auth().currentUser.uid,
      populates: profilePopulates
    }]
  }),
  connect(({ firebase, firestore }: RootState) => {
    return ({
      auth: firebase.auth,
      users: populate(firestore, "users", profilePopulates),
      profile: populateProfile(firestore),
    });
  })
)