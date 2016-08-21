import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import KanbanApi from '../api/KanbanApi';
import {throttle} from '../utils';
import CardStore from '../stores/CardStore';

let CardActionCreators = {

    fetchCards() {
        let promise = KanbanApi.fetchCards();
        let type = {request : constants.FETCH_CARDS, success : constants.FETCH_CARDS_SUCCESS, failure : constants.FETCH_CARDS_ERROR};
        let payload = {}
        AppDispatcher.dispatchAsync(promise, type, payload);
    },

    toggleCardDetails(cardId) {
        AppDispatcher.dispatch({
            type : constants.TOGGLE_CARD_DETAILS,
            payload : {cardId}
        });
    },

    addCard(card) {
        let promise = KanbanApi.addCard(card);
        let type = {request : constants.CREATE_CARD, success : constants.CREATE_CARD_SUCCESS, failure : constants.CREATE_ERROR};
        let payload = {card}
        AppDispatcher.dispatchAsync(promise, type, payload);
    },

    updateCard(card, draftCard) {
        let promise = KanbanApi.updateCard(card, draftCard);
        let type = {request : constants.UPDATE_CARD, success : constants.UPDATE_CARD_SUCCESS, failure : constants.UPDATE_ERROR};
        let payload = {card, draftCard}
        AppDispatcher.dispatchAsync(promise, type, payload);
    },

    updateCardStatus : throttle( (cardId, listId)  => {
        AppDispatcher.dispatch( {
            type : constants.UPDATE_CARD_STATUS,
            payload : {cardId, listId}
        });
    }),

    updateCardPosition : throttle( (cardId, afterId)  => {
        AppDispatcher.dispatch( {
            type : constants.UPDATE_CARD_POSITION,
            payload : {cardId, afterId}
        });
    }, 500),

    persistCardDrag(cardProps) {
        let card = CardStore.getCard(cardProps.id);
        let cardIndex = CardStore.getCardIndex(cardProps.id);

        let promise = KanbanApi.persistCardDrag(card.id, card.status, cardIndex);
        let type = {request : constants.PERSIST_CARD_DRAG, success : constants.PERSIST_CARD_DRAG_SUCCESS, failure : constants.PERSIST_CARD_DRAG_ERROR};
        let payload = {cardProps}

        AppDispatcher.dispatchAsync(promise, type, payload);
    },

    createDraft(card) {
        AppDispatcher.dispatch({
            type : constants.CREATE_DRAFT,
            payload : {card}
        });
    },

    updateDraft(field, value) {
        AppDispatcher.dispatch({
            type : constants.UPDATE_DRAFT,
            payload : {field, value}
        });
    },
};

export default CardActionCreators;
