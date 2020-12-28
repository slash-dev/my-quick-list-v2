import { createStore } from "redux";
import { rootReducer } from "./reducer";

export default function configureStore(initialState: any) {
  return createStore(rootReducer, initialState);
}

// export default function configureStore(initialState: any) {
//   const middleware = [thunk.withExtraArgument({ getFirebase })]
//   const createStoreWithMiddleware = compose(
//     applyMiddleware(...middleware),
//     typeof window === 'object' &&
//       // @ts-ignore
//       typeof window.devToolsExtension !== 'undefined'
//       // @ts-ignore
//       ? () => window.__REDUX_DEVTOOLS_EXTENSION__
//       : (f: any) => f
//   )(createStore)
//   // @ts-ignore
//   const store = createStoreWithMiddleware(rootReducer, initialState)

//   return store
// }