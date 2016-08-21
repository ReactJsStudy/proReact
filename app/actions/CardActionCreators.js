import CONST from '../constants'

import kanbanAPI from '../api/kanbanAPI'
import { throttle } from '../util'
import { getCard, getCardIndex } from '../reducers/store'

const CardActionCreators = {
	fetchCards() {
		return dispatch => {
			dispatch({
				type: CONST.RequestCards
			});
			kanbanAPI.fetchCards().then(
				cards => dispatch({
					type: CONST.ReceiveCards,
					success: true,
					cards
				}),
				error => dispatch({
					type: CONST.ReceiveCards,
					success: false,
					error
				})
			)
		}
	},
	toggleCardDetails(cardId) {
		return {
			type: CONST.ToggleCardDetails, cardId }
	},
	addCard(card) {
		return dispatch => {
			dispatch({
				type: CONST.RequestCreateCard, card
			})
			kanbanAPI.addCard(card).then(
				receivedNewCard => dispatch({
					type: CONST.ReceiveCreateCard,
					success: true,
					card: receivedNewCard
				}),
				error => dispatch({
					type: CONST.ReceiveCreateCard,
					success: false,
					card,
					error
				})
			)
		}
	},
	updateCard(card, cardDraft) {
		return dispatch => {
			dispatch({
				type: CONST.RequestUpdateCard, card: cardDraft
			})
			kanbanAPI.updateCard(card, cardDraft).then(
				receivedUpdatedCard => dispatch({
					type: CONST.ReceiveUpdateCard,
					success: true,
					card: receivedUpdatedCard
				}),
				error => dispatch({
					type: CONST.ReceiveUpdateCard,
					sucess: false,
					card,
					error
				})
			)
		}
	},
	deleteCard(cardId) {
		return dispatch => {
			dispatch({
				type: CONST.RequestDeleteCard, cardId
			})
			kanbanAPI.deleteCard(cardId).then(
				receivedDeletedCard => dispatch({
					type: CONST.ReceiveDeleteCard,
					success: true,
					card: receivedDeletedCard
				}),
				error => dispatch({
					type: CONST.ReceiveDeleteCard,
					success: false,
					cardId,
					error
				})
			)
		}
	},
	_updateCardStatus: throttle((dispatch, cardId, listId) => {
		dispatch({
			type: CONST.UpdateCardStatus,
			cardId,
			listId
		})
	}, 300),
	updateCardStatus(cardId, listId) {
		return dispatch => this._updateCardStatus(dispatch, cardId, listId)
	},

	_updateCardPosition: throttle((dispatch, cardId, afterId) => {
		dispatch({
			type: CONST.UpdateCardPosition,
			cardId,
			afterId
		});
	}, 300),
	updateCardPosition(cardId, afterId) {
		return dispatch => this._updateCardPosition(dispatch, cardId, afterId)
	},
	persistCardDrag(cardProps) {
		return (dispatch, getState) => {
			const state = getState()
			const card = getCard(state, cardProps.id)
			const cardIndex = getCardIndex(state, cardProps.id)
			dispatch({
				type: CONST.RequestPersistCardDrag
			})
			kanbanAPI.persistCardDrag(card.id, card.status, cardIndex).then(
				()=> dispatch({
					type: CONST.ReceivePersistCardDrag,
					success: true,
					cardProps
				}),
				error => dispatch({
					type: CONST.ReceivePersistCardDrag,
					success: false,
					cardProps,
					error
				})
			)
		}
	},
	toggleCardDetails(cardId) {
		return {
			type: CONST.ToggleCardDetails,
			cardId
		}
	},
	createDraft(card) {
		return {
			type: CONST.CreateDraft,
			card
		}
	},
	updateDraft(field, value) {
		return {
			type: CONST.UpdateDraft,
			field,
			value
		}
	}
}

export default CardActionCreators