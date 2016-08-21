import React from 'react';
import {Container} from 'flux/utils';
import KanbanBoard from './KanbanBoard';
import CardActionCreators from '../actions/CardActionCreators';
import CardStore from '../stores/CardStore';

class KanbanBoardContainer extends React.Component {

    componentDidMount() {
        CardActionCreators.fetchCards();
    }

    render() {
        let KanbanBoard = this.props.children && React.cloneElement(this.props.children, {
            cards : this.state.cards
        });
        return KanbanBoard;
    }
}


/**
 * 컨테이너 고차 함수는 플럭스 유틸의 스토어를 확장하는 스토어에만 이용할 수 있다.
 * getStores : 컴포넌트가 수신하는 모든 스토어의 배열을 반환.
 * calculateState : 스토어 상태와 로컬 컴포넌트의 상태를 매핑.
 */
KanbanBoardContainer.getStores = _ => ([CardStore]);
KanbanBoardContainer.calculateState = prevState => ({cards : CardStore.getState()});

export default Container.create(KanbanBoardContainer);
