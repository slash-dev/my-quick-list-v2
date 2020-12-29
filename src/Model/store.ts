import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'

export default function configureStore(initialState: any = {}) {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
}