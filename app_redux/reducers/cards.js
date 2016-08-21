import {
    RECEIVE_CARDS,
    REQUEST_CREATE_CARD,
    RECEIVE_CREATE_CARD,
    TOGGLE_CARD_DETAILS,
    REQUEST_UPDATE_CARD,
    RECEIVE_UPDATE_CARD,
    UPDATE_CARD_POSITION,
    UPDATE_CARD_STATUS,
    RECEIVE_PERSIST_CARD_DRAG,
    REQUEST_CREATE_TASK,
    RECEIVE_CREATE_TASK,
    REQUEST_DELETE_TASK,
    RECEIVE_DELETE_TASK,
    REQUEST_TOGGLE_TASK,
    RECEIVE_TOGGLE_TASK
} from '../constants';
import update from 'react-addons-update';
import 'babel-polyfill';

let cardIndex;
let taskIndex;

const cards = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_CARDS:
            return action.cards;
            break;

        /*
        * Card Creation
        */
        case REQUEST_CREATE_CARD:
            return update(state, {
                $push: [action.card]
            });
            break;

        case RECEIVE_CREATE_CARD:
            if(!action.success){
                cardIndex = getCardIndex(state, action.card.id);
                return update(state, {
                    $splice:[[cardIndex, 1]]
                });
            }
            return state;
            break;

        /*
        * Card Status Toggle
        */
        case TOGGLE_CARD_DETAILS:
            cardIndex = getCardIndex(state, action.cardId);
            return update(state, {
                [cardIndex]: {
                    showDetails: { $apply: currentValue => (currentValue !== false)? false : true }
                }
            });
            break;

        /*
        * Card Update
        */
        case REQUEST_UPDATE_CARD:
            cardIndex = getCardIndex(state, action.card.id);
            return update(state, {
                [cardIndex]: {
                    $set: action.card
                }
            });
            break;

        case RECEIVE_UPDATE_CARD:
            if(!action.success){
                cardIndex = getCardIndex(state, action.card.id);
                return update(state, {
                    [cardIndex]: {
                        $set: action.card
                    }
                });
            }
            return state;
            break;

        /*
        * Card Drag'n Drop
        */
        case UPDATE_CARD_POSITION:
            if(action.cardId !== action.afterId) {
                cardIndex = getCardIndex(state, action.cardId);
                let card = state[cardIndex]
                let afterIndex = getCardIndex(state, action.afterId);
                return update(state, {
                    $splice: [
                        [cardIndex, 1],
                        [afterIndex, 0, card]
                    ]
                });
            } else {
                return state;
            }
            break;

        case UPDATE_CARD_STATUS:
            cardIndex = getCardIndex(state, action.cardId);
            return update(state, {
                [cardIndex]: {
                    status: { $set: action.listId }
                }
            });
            break;

        case RECEIVE_PERSIST_CARD_DRAG:
            if(!action.success){
                cardIndex = getCardIndex(state, action.cardProps.id);
                return update(state, {
                    [cardIndex]: {
                        status: { $set: action.cardProps.status }
                    }
                });
            }
            return state;
            break;


        /*
        * Task Creation
        */
        case REQUEST_CREATE_TASK:
            cardIndex = getCardIndex(state, action.cardId);
            return update(state, {
                [cardIndex]: {
                    tasks: { $push: [action.task] }
                }
            });
            break;

        case RECEIVE_CREATE_TASK:
            cardIndex = getCardIndex(state, action.cardId);
            taskIndex = state[cardIndex].tasks.findIndex(task => (
                task.id == action.temporaryTaskId
            ));

            if(action.success) {
                // Update the temporary id
                return update(state, {
                    [cardIndex]: { tasks: { [taskIndex]: {
                        id: { $set: action.task.id }
                    } } }
                });
            } else {
                // Remove task
                return update(state, {
                    [cardIndex]: { tasks: {
                        $splice:[[taskIndex, 1]]
                    } }
                });
            }
            break;

        /*
        * Task Deletion
        */
        case REQUEST_DELETE_TASK:
            cardIndex = getCardIndex(state, action.cardId);
            return update(state, {
                [cardIndex]: {
                    tasks: {$splice: [[action.taskIndex,1]] }
                }
            });
            break;

        case RECEIVE_DELETE_TASK:
            if(!action.success){
                cardIndex = getCardIndex(state, action.cardId);
                return update(state, {
                    [cardIndex]: {
                        tasks: {$splice: [[action.taskIndex, 0, action.task]] }
                    }
                });
            }
            return state;
            break;

        /*
        * Task Toggling
        */
        case REQUEST_TOGGLE_TASK:
            cardIndex = getCardIndex(state, action.cardId);
            return update(state, {
                [cardIndex]: {
                    tasks: {
                        [action.taskIndex]: { done: { $apply: (done) => !done }}
                    }
                }
            });
            break;

        case RECEIVE_TOGGLE_TASK:
            if(!action.success){
                cardIndex = getCardIndex(state, action.cardId);
                return update(state, {
                    [cardIndex]: {
                        tasks: {
                            [action.taskIndex]: { done: { $apply: (done) => !done }}
                        }
                    }
                });
            }
            break;

        default:
            return state;
            break;
    }
};

export default cards;

export const getCard = (state, id) => state.find((card)=>card.id == id);
export const getCardIndex = (state, id) => state.findIndex((card)=>card.id == id);
