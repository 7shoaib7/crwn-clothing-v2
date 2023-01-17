import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import { rootReducer } from './root-reducer';

// const loggerMiddleware = (store)=>(next)=>(action)=>{
//   if(!action.type){
//     return next(action)
//   }

//      console.log("type:", action.type)
//      console.log("payload:", action.payload)
//      console.log("currentState:", store.getState())

//      next(action)
//      console.log("nextState:", store.getState())
// }


const middleWares = [process.env.NODE_ENV === 'development' && logger, thunk].filter(
  Boolean
);
const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// export const store = createStore(rootReducer, undefined, composedEnhancers);

//persist store
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);