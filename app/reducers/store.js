import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import cards, * as fromCards from './cardReducer'
import cardDraft from './cardDraftReducer'

const reducers = combineReducers({ cards, cardDraft })
export const getCard = (state, id) => fromCards.getCard(state.cards, id)
export const getCardIndex = (state, id) => fromCards.getCardIndex(state.cards, id)

const logger = store => next => action => {
	if(typeof action !== 'function') console.log('dispatching: ', action)
	return next(action)
}

const kanbanStore = createStore(
	reducers,
	compose(
		applyMiddleware(logger, thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
)

export default kanbanStore