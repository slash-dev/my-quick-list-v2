import React, { useState, ReactElement } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { combineReducers, compose } from 'redux'
import {
  useFirebase, isLoaded, isEmpty,
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore'
import { useSelector } from 'react-redux'
import GoogleButton from 'react-google-button'
import { RootState } from './Model/reducer'
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom'
import KitchenIcon from '@material-ui/icons/Kitchen';
import ListAltIcon from '@material-ui/icons/ListAlt';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MeetingRoom from '@material-ui/icons/MeetingRoom';
import SortIcon from '@material-ui/icons/Sort';
import MenuIcon from '@material-ui/icons/Menu';
import {
  CircularProgress, Hidden, Drawer, Divider,
  List, ListItem, ListItemIcon, ListItemText, withStyles, Theme,
  WithStyles, CssBaseline, AppBar, Toolbar, IconButton, Typography,
  Avatar, Menu, MenuItem, Slide, useScrollTrigger
} from '@material-ui/core';
import configureStore from './Model/store'
import CoreLayout from './Layouts/CoreLayout'

const firebaseConfig = {
  apiKey: "AIzaSyD8h6ZzS0SRK7ZAIj4lMOpfXZ-NMvSEKcg",
  authDomain: "canary-easy-shopping-list.firebaseapp.com",
  databaseURL: "https://canary-easy-shopping-list.firebaseio.com",
  projectId: "canary-easy-shopping-list",
  storageBucket: "canary-easy-shopping-list.appspot.com",
  messagingSenderId: "922228656385",
  appId: "1:922228656385:web:ecb7fdff2eb0cbcd"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
  // enableClaims: true // Get custom claims along with the profile
}

firebase.initializeApp(firebaseConfig)
firebase.firestore()

const store = configureStore()

const rrfProps = {
  firebase,
  config: rrfConfig,
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
              {/* <Route path="/recipes" component={Recipes} />
                  <Route exact path="/lists" component={ShoppingLists} />
                  <Route exact path="/lists/show/:id" render={(props) => <ShoppingListForm match={props.match}
                    history={props.history}
                    location={props.location} />} />
                  <Route exact path="/lists/show/:id/:sublistId" render={(props) => <SublistForm match={props.match}
                    history={props.history}
                    location={props.location} />} />
                  <Route path="/fridge" component={FridgeOverview} />
                  <Route path="/ingredients" component={IngredientsForm} />
                  <Route path="/" component={HomeComponent} /> */}
            </Switch>
          </CoreLayout>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

render(<App />, document.getElementById('root'))
