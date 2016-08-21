import CONST from '../constants'
import update from 'react-addons-update'
import 'babel-polyfill'

let cardIndex, taskIndex

export const getCard = (state, id) => state.find(card => card.id == id)
export const getCardIndex = (state, id) => state.findIndex(card => card.id == id)

const cardReducer = (state = [], action) => {
	switch(action.type) {

		/* card creation */
		case CONST.ReceiveCards: return action.cards
		case CONST.RequestCreateCard:
			return update(state, {
				$push: [action.card]
			})
		case CONST.ReceiveCreateCard:
			if(!action.success) {
				cardIndex = getCardIndex(state, action.card.id)
				return update(state, {
					$splice: [[cardIndex, 1]]
				})
			}
			return state

		/* card status toggle */
		case CONST.ToggleCardDetails:
			cardIndex = getCardIndex(state, action.cardId)
			return update(state, {
				[cardIndex]: {
					showDetails: {
						$apply: currentValue => !currentValue
					}
				}
			})

		/* card update */
		case CONST.RequestUpdateCard:
			cardIndex = getCardIndex(state, action.card.id)
			return update(state, {
				[cardIndex]: {
					$set: action.card
				}
			})
		case CONST.ReceiveUpdateCard:
			if(!action.success) {
				cardIndex = getCardIndex(state, action.card.id)
				return update(state, {
					[cardIndex]: {
						$set: action.card
					}
				})
			}

		/* card delete */
		case CONST.RequestDeleteCard:
			cardIndex = getCardIndex(state, action.cardId)
			return update(state, {
				$splice: [[ cardIndex, 1 ]]
			})
		case CONST.ReceiveDeleteCard:
			if(!action.success) {
				cardIndex = getCardIndex(state, action.cardId)
				let card = getCard(state, action.cardId)
				return update(state, {
					$splice: [[ cardIndex, 0, card ]]
				})
			}
			return state

		/* card drag and drop*/
		case CONST.UpdateCardPosition:
			if(action.cardId !== action.afterId) {
				cardIndex = getCardIndex(state, action.cardId)
				let card = state[cardIndex]
				let afterIndex = getCardIndex(state, action.afterId)
				return update(state, {
					$splice: [
						[cardIndex, 1],
						[afterIndex, 0, card]
					]
				})
			}
		case CONST.UpdateCardStatus:
			cardIndex = getCardIndex(state, action.cardId)
			return update(state, {
				[cardIndex]: {
					status: { $set: action.listId }
				}
			})
		case CONST.ReceivePersistCardDrag:
			if(!action.success) {
				cardIndex = getCardIndex(state, action.cardProps.id)
				return update(state, {
					[cardIndex]: {
						status: { $set: action.cardProps.status }
					}
				})
			}
			return state

		/* task creation */
		case CONST.RequestCreateTask:
			cardIndex = getCardIndex(state, action.cardId)
			return update(state, {
				[cardIndex]: {
					tasks: { $push: [action.task]}
				}
			})
		case CONST.ReceiveCreateTask:
			cardIndex = getCardIndex(state, action.cardId)
			taskIndex = state[cardIndex].tasks.findIndex(task => task.id === action.temporaryTaskId)
			if(action.success) {
				return update(state, {
					[cardIndex]: { tasks: {
						[taskIndex]: {
							id: { $set: action.task.id }
						}
					}}
				})
			}
			return update(state, {
				[cardIndex]: { tasks: {
					$splice: [[ taskIndex, 1 ]]
				}}
			})

		/* task deletion */
		case CONST.RequestDeleteTask:
			cardIndex = getCardIndex(state, action.cardId)
			return update(state, {
				[cardIndex]: {
					tasks: {
						$splice: [[ action.taskIndex, 1 ]]
					}
				}
			})
		case CONST.ReceiveDeleteTask:
			if(!action.success) {
				cardIndex = getCardIndex(state, action.cardId)
				return update(state, {
					[cardIndex]: { tasks: {
						$splice: [[ action.taskIndex, 0, action.task ]]
					}}
				})
			}
			return state

		/* task toggling */
		case CONST.RequestToggleTask:
			cardIndex = getCardIndex(state, action.cardId)
			return update(state, {
				[cardIndex]: { tasks: {
					[action.taskIndex]: { done: {
						$apply: done => !done
					}}
				}}
			})
		case CONST.ReceiveToggleTask:
			if(!action.success) {
				cardIndex = getCardIndex(state, action.cardId)
				return update(state, {
					[cardIndex]: { tasks: {
						[action.taskIndex]: { done: {
							$apply: done => !done
						}}
					}}
				})
			}
		default: return state
	}
}

export default cardReducer