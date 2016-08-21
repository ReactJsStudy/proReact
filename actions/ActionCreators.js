import {
  REQUEST_CARDS,
  RECEIVE_CARDS,
  REQUEST_CREATE_CARD,
  RECEIVE_CREATE_CARD,
  TOGGLE_CARD_DETAILS,
  REQUEST_UPDATE_CARD,
  RECEIVE_UPDATE_CARD,
  UPDATE_CARD_POSITION,
  UPDATE_CARD_STATUS,
  REQUEST_PERSIST_CARD_DRAG,
  RECEIVE_PERSIST_CARD_DRAG,
  CREATE_DRAFT,
  UPDATE_DRAFT,
  REQUEST_CREATE_TASK,
  RECEIVE_CREATE_TASK,
  REQUEST_DELETE_TASK,
  RECEIVE_DELETE_TASK,
  REQUEST_TOGGLE_TASK,
  RECEIVE_TOGGLE_TASK
} from '../constants';

import KanbanAPI from '../api/KanbanApi';
import {throttle} from '../utils/utils';
import {getCard, getCardIndex} from '../reducer/rootReducer';
import Immutable from 'immutable';

let ActionCreators = {
<<<<<<< Updated upstream
=======
    fetchCards() {
        return (dispatch) => {
            dispatch({ type:FETCH_CARDS_SUCCESS });
            KanbanAPI.fetchCards().then(
            (cards) => dispatch({type:FETCH_CARDS_SUCCESS, success:true,cards}),
            (error) => dispatch({type:FETCH_CARDS_ERROR, success:false})
        )
        }
    },
>>>>>>> Stashed changes


<<<<<<< Updated upstream
  fetchCards() {
    return (dispatch) => {
      dispatch({ type: REQUEST_CARDS });
      KanbanAPI.fetchCards().then(
        (cards) => dispatch({ type: RECEIVE_CARDS, success:true, cards }),
        (error) => dispatch({ type: RECEIVE_CARDS, success:false, error })
      );
    };
  },

  toggleCardDetails(cardId) {
    return { type: TOGGLE_CARD_DETAILS, cardId };
  },

  addCard(card) {
    return (dispatch) => {
      dispatch({ type: REQUEST_CREATE_CARD, card });
      KanbanAPI.addCard(card).then(
        (receivedNewCard) => dispatch({ type: RECEIVE_CREATE_CARD, success:true, card: receivedNewCard }),
        (error) => dispatch({ type: RECEIVE_CREATE_CARD, success:false, card, error })
      );
    };
  },


  updateCard(card, cardDraft) {
    return (dispatch) => {
      dispatch({ type: REQUEST_UPDATE_CARD, card:cardDraft });
      KanbanAPI.updateCard(card, cardDraft).then(
        (receivedUpdatedCard) => dispatch({ type: RECEIVE_UPDATE_CARD, success:true, card:receivedUpdatedCard }),
        (error) => dispatch({ type: RECEIVE_UPDATE_CARD, success:false, card, error })
      )
    };
  },

  _updateCardStatus: throttle((dispatch, cardId, listId) => {
    dispatch({ type: UPDATE_CARD_STATUS, cardId, listId });
  }),

  updateCardStatus(cardId, listId) {
    return (dispatch) => this._updateCardStatus(dispatch, cardId, listId);
  },

  _updateCardPosition: throttle((dispatch, cardId, afterId) => {
    dispatch({ type: UPDATE_CARD_POSITION, cardId, afterId });
  }, 500),

  updateCardPosition(cardId, afterId) {
    return (dispatch) => this._updateCardPosition(dispatch, cardId, afterId);
  },

  persistCardDrag(cardProps) {
    return (dispatch, getState) => {
      const state = getState();
      const card = getCard(state, cardProps.id);
      const cardIndex = getCardIndex(state, cardProps.id);
      dispatch({ type: REQUEST_PERSIST_CARD_DRAG });
      KanbanAPI.persistCardDrag(card.id, card.status, cardIndex).then(
        () => dispatch({ type: RECEIVE_PERSIST_CARD_DRAG, success:true, cardProps }),
        (error) => dispatch({ type: RECEIVE_PERSIST_CARD_DRAG, success:false, cardProps, error })
      );
    }
  },


  toggleCardDetails(cardId) {
    return { type: TOGGLE_CARD_DETAILS, cardId };
  },

  createDraft(card) {
    return { type: CREATE_DRAFT, card };
  },

  updateDraft(field, value) {
    return { type: UPDATE_DRAFT, field, value };
  },

  addTask(cardId, task) {
    return (dispatch) => {
      dispatch({ type: REQUEST_CREATE_TASK, cardId, task });
      KanbanAPI.addTask(cardId, task).then(
        (receivedNewTask) => dispatch({ type: RECEIVE_CREATE_TASK, success:true, cardId, task: receivedNewTask, temporaryTaskId: task.id }),
        (error) => dispatch({ type: RECEIVE_CREATE_TASK, success:false, cardId, temporaryTaskId: task.id, error })
      )
    };
  },

  deleteTask(cardId, task, taskIndex) {
    return (dispatch) => {
      dispatch({ type: REQUEST_DELETE_TASK, cardId, taskIndex });
      KanbanAPI.deleteTask(cardId, task).then(
        () => dispatch({ type: RECEIVE_DELETE_TASK, success:true, cardId, task, taskIndex }),
        (error) => dispatch({ type: RECEIVE_DELETE_TASK, success:false, cardId, task, taskIndex, error })
      )
    };
  },

  toggleTask(cardId, task, taskIndex) {
    return (dispatch) => {
      dispatch({ type: REQUEST_TOGGLE_TASK, cardId, taskIndex });
      KanbanAPI.toggleTask(cardId, task).then(
        () => dispatch({ type: RECEIVE_TOGGLE_TASK, success:true, cardId, task, taskIndex }),
        (error) => dispatch({ type: RECEIVE_TOGGLE_TASK, success:false, cardId, taskIndex, error })
      )
    };
  }

};

export default ActionCreators;
=======
           return (dispatch) => {
            dispatch({type:CREATE_CARD_SUCCESS});
            KanbanAPI.addCard().then(
                (card) => dispatch({type:CREATE_CARD_SUCCESS, success:true,card}),
                (error) => dispatch({type:CREATE_CARD_ERROR, success:false})
                )
           }
        }

}
>>>>>>> Stashed changes

