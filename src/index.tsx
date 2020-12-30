import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import {
  ReactReduxFirebaseProvider,
} from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import configureStore from './Model/store'
import CoreLayout from './Layouts/CoreLayout'
import Recipes from './Components/Recipes/Recipes'
import Groups from './Components/Groups/Groups'

const firebaseConfig = {
  apiKey: "AIzaSyD8h6ZzS0SRK7ZAIj4lMOpfXZ-NMvSEKcg",
  authDomain: "canary-easy-shopping-list.firebaseapp.com",
  databaseURL: "https://canary-easy-shopping-list.firebaseio.com",
  projectId: "canary-easy-shopping-list",
  storageBucket: "canary-easy-shopping-list.appspot.com",
  messagingSenderId: "922228656385",
  appId: "1:922228656385:web:ecb7fdff2eb0cbcd"
};

firebase.initializeApp(firebaseConfig)
firebase.firestore()

const store = configureStore();

const rrfProps = {
  firebase,
  config: {
    userProfile: 'users',  // where profiles are stored in database
    useFirestoreForProfile: true,
    // TODO: Should populate the groups using "groups" table.
    // Not yet supported for firestore though.
    // profileParamsToPopulate: [
    //   'groups:groups'
    // ]
  },
  dispatch: store.dispatch,
  createFirestoreInstance
}

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <CoreLayout >
            <Switch>
              <Route path="/groups" component={Groups} />
              <Route path="/recipes" component={Recipes} />
            </Switch>
          </CoreLayout>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

render(<App />, document.getElementById('root'))
