import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import {ReduceStore} from 'flux/utils';
import update from 'react-addons-update';
import Immutable from 'immutable';

import 'babel-polyfill';

class CardStore extends ReduceStore {
    /**
     * ReduceStore를 홪장하려면
     * getInitialState(), reduce() 를 구현해야 한다.
     */

    /**
     * 스토어의 초기 상태 정의
     * @return {[type]} [description]
     */
    getInitialState() {
        return [];
    }

    getCard(id) {
        return this._state.find( card => card.id == id );
    }

    getCardIndex(id) {
        return this._state.findIndex( card => card.id == id );
    }

    /**
     * 액션의 결과로 이 상태를 수정한다.
     * @param  {[type]} state  여기는 누구의 상태가 오는거지?
     * @param  {[type]} action dispatch로 부터 action 객체를 전발 받는다.
     * @return {[type]}        [description]
     */

    reduce(state, action) {

        let cardIndex, taskIndex;

        switch(action.type) {

            // make list
            case constants.FETCH_CARDS_SUCCESS :
                return action.payload.response;
                break;

            // create
            case constants.CREATE_CARD :
                return update(this.getState(), {
                    $push : [action.payload.card]
                });
                break;

            case constants.CREATE_CARD_SUCCESS :
                cardIndex = this.getCardIndex(action.payload.card.id);
                return update(this.getState(), {
                    [cardIndex] : {
                        id : {$set:action.payload.response.id}
                    }
                });
                break;

            case constants.CREATE_CARD_ERROR :
                cardIndex = this.getCardIndex(action.payload.card.id);
                return update(this.getState(), {
                    $splice : [[cardIndex, 1]]
                });
                break;

            case constants.TOGGLE_CARD_DETAILS :
                cardIndex = this.getCardIndex(action.payload.cardId);
                return update(this.getState(), {
                    [cardIndex] : {
                        showDetails : { $apply : (currentValue) => (currentValue != false) ? false : true }
                    }
                })
                break;

            // update
            case constants.UPDATE_CARD :
                cardIndex = this.getCardIndex(action.payload.card.id);
                return update(this.getState(), {
                    [cardIndex] : { $set : action.payload.draftCard }
                });
                break;

            case constants.UPDATE_CARD_ERROR :
                cardIndex = this.getCardIndex(action.payload.card.id);
                return update(this.getState(), {
                    [cardIndex] : { $set : action.payload.card}
                });
                break;

            // task dnd
            case constants.UPDATE_CARD_POSITION :
                if ( action.payload.cardId !== action.payload.afterId ) {
                    cardIndex = this.getCardIndex(action.payload.cardId);
                    let card = this.getState()[cardIndex];
                    let afterIndex = this.getCardIndex(action.payload.afterId);
                    return update(this.getState(), {
                        $splice : [[cardIndex, 1], [afterIndex, 0, card]]
                    });
                }

                return this.getState();

                break;

            case constants.UPDATE_CARD_STATUS :
                cardIndex = this.getCardIndex(action.payload.cardId);
                return update(this.getState(), {
                    [cardIndex] : {
                        status : { $set : action.payload.listId }
                    }
                });
                break;

            case constants.PERSIST_CARD_DRAG_ERROR :
                cardIndex = this.getCardIndex(action.payload.cardProps.id);
                return update(this.getState(), {
                    [cardIndex] : {
                        status : { $set : action.payload.cardProps.status }
                    }
                });
                break;

            // create task
            case constants.CREATE_TASK :
                cardIndex = this.getCardIndex(action.payload.cardId);
                return update(this.getState(), {
                    [cardIndex] : {
                        tasks : { $push : [action.payload.task] }
                    }
                });
                break;
            case constants.CREATE_TASK_SUCCESS :
                cardIndex = this.getCardIndex(action.payload.cardId);
                taskIndex = this.getState()[cardIndex].tasks.findIndex( task => task.id == action.payload.task.id );
                return update(this.getState(), {
                    [cardIndex] : {
                        tasks : {
                            [taskIndex] : {
                                id : { $set : action.payload.response.id }
                            }
                        }
                    }
                });
                break;
            case constants.CREATE_TASK_ERROR :
                cardIndex = this.getCardIndex(action.payload.cardId);
                taskIndex = this.getState()[cardIndex].tasks.findIndex( task => task.id == action.payload.task.id );
                return update(this.getState(), {
                    [cardIndex] : {
                        tasks : { $push : [newTask] }
                    }
                });
                break;

            // delete task
            case constants.DELETE_TASK :
                cardIndex = this.getCardIndex(action.payload.cardId);
                return update(this.getState(), {
                    [cardIndex] : {
                        tasks : { $splice : [[action.payload.taskIndex, 1]] }
                    }
                });
                break;

            case constants.DELETE_TASK_ERROR :
                cardIndex = this.getCardIndex(action.payload.cardId);
                return update(this.getState(), {
                    [cardIndex] : {
                        tasks : { $splice : [[action.payload.taskIndex, 0, action.payload.task]] }
                    }
                });
                break;

            // toggle task
            case constants.TOGGLE_TASK :
                cardIndex = this.getCardIndex(action.payload.cardId);
                return update(this.getState(), {
                    [cardIndex] : {
                        tasks : {
                            [action.payload.taskIndex] : {
                                done : { $apply : done => !done }
                            }
                        }
                    }
                });
                break;

            case constants.TOGGLE_TASK_ERROR :
                return this.getState();
                break;

            default :
                return state;
        }
    }
}

export default new CardStore(AppDispatcher);
