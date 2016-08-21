import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducer/rootReducer';


const logger = (store) => (next) => (action) => {
  if(typeof action !== "function"){
    console.log('dispatching:', action);
  }
  return next(action);
}

const kanbanStore = createStore(
  reducers,
  compose(
  applyMiddleware(logger, thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default kanbanStore;
