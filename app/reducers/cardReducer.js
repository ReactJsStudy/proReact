import CONST from '../constants'
import update from 'react-addons-update'

let cardIndex, taskIndex

export const getCard = (state, id) => state.find(card => card.id == id)
export const getCardIndex = (state, id) => state.findIndex(card => card.id == id)

const cardReducer = {
	[CONST.ReceiveCards]: (state, {cards}) => cards,
	[CONST.RequestCreateCard]: (state, {card}) => update(state, { $push: [card] }),
	[CONST.ReceiveCreateCard]: (state, {card: {id}, success}) => {
		if(!success) {
			cardIndex = getCardIndex(state, id)
			return update(state, {
				$splice: [[cardIndex, 1]]
			})
		}
		return state
	},
	[CONST.ToggleCardDetails]: (state, {cardId}) => {
		cardIndex = getCardIndex(state, cardId)
		return update(state, {
			[cardIndex]: {
				showDetails: {
					$apply: currentValue => !currentValue
				}
			}
		})
	},
	[CONST.RequestUpdateCard]: (state, {card}) => {
		cardIndex = getCardIndex(state, card.id)
		return update(state, {
			[cardIndex]: {
				$set: card
			}
		})
	},
	[CONST.ReceiveUpdateCard]: (state, {card, success}) => {
		if(!success) {
			cardIndex = getCardIndex(state, card.id)
			return update(state, {
				[cardIndex]: {
					$set: card
				}
			})
		}
	},
	[CONST.RequestDeleteCard]: (state, {cardId}) => {
		cardIndex = getCardIndex(state, cardId)
		return update(state, {
			$splice: [[ cardIndex, 1 ]]
		})
	},
	[CONST.ReceiveDeleteCard]: (state, {cardId, success}) => {
		if(!success) {
			cardIndex = getCardIndex(state, cardId)
			let card = getCard(state, cardId)
			return update(state, {
				$splice: [[ cardIndex, 0, card ]]
			})
		}
		return state
	},
	[CONST.UpdateCardPosition]: (state, {cardId, afterId}) => {
		if(cardId !== afterId) {
			cardIndex = getCardIndex(state, cardId)
			let card = state[cardIndex]
			let afterIndex = getCardIndex(state, afterId)
			return update(state, {
				$splice: [
					[cardIndex, 1],
					[afterIndex, 0, card]
				]
			})
		}
	},
	[CONST.UpdateCardStatus]: (state, {cardId, listId}) => {
		cardIndex = getCardIndex(state, cardId)
		return update(state, {
			[cardIndex]: {
				status: { $set: listId }
			}
		})
	},
	[CONST.ReceivePersistCardDrag]:	(state, {cardProps: {id, status}, success}) => {
		if(!success) {
			cardIndex = getCardIndex(state, id)
			return update(state, {
				[cardIndex]: {
					status: { $set: status }
				}
			})
		}
		return state
	},
	[CONST.RequestCreateTask]: (state, {cardId, task}) => {
		cardIndex = getCardIndex(state, cardId)
		return update(state, {
			[cardIndex]: {
				tasks: { $push: [task]}
			}
		})
	},
	[CONST.ReceiveCreateTask]: (state, {cardId, task: {id}, temporaryTaskId, success}) => {
		cardIndex = getCardIndex(state, cardId)
		taskIndex = state[cardIndex].tasks.findIndex(task => task.id === temporaryTaskId)
		if(success) {
			return update(state, {
				[cardIndex]: { tasks: {
					[taskIndex]: {
						id: { $set: id }
					}
				}}
			})
		}
		return update(state, {
			[cardIndex]: { tasks: {
				$splice: [[ taskIndex, 1 ]]
			}}
		})
	},
	[CONST.RequestDeleteTask]: (state, {cardId, taskIndex}) => {
		cardIndex = getCardIndex(state, cardId)
		return update(state, {
			[cardIndex]: {
				tasks: {
					$splice: [[ taskIndex, 1 ]]
				}
			}
		})
	},
	[CONST.ReceiveDeleteTask]: (state, {cardId, task, taskIndex, success}) => {
		if(!success) {
			cardIndex = getCardIndex(state, cardId)
			return update(state, {
				[cardIndex]: { tasks: {
					$splice: [[ taskIndex, 0, task ]]
				}}
			})
		}
		return state
	},
	[CONST.RequestToggleTask]: (state, {cardId, taskIndex}) => {
		cardIndex = getCardIndex(state, cardId)
		return update(state, {
			[cardIndex]: { tasks: {
				[taskIndex]: { done: {
					$apply: done => !done
				}}
			}}
		})
	},
	[CONST.ReceiveToggleTask]: (state, {cardId, taskIndex, success}) => {
		if(!success) {
			cardIndex = getCardIndex(state, cardId)
			return update(state, {
				[cardIndex]: { tasks: {
					[taskIndex]: { done: {
						$apply: done => !done
					}}
				}}
			})
		}
	}
}

export default (state = [], action) =>
	cardReducer[action.type] ? cardReducer[action.type](state, action) : state