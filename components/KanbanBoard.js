import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Link } from 'react-router'
import CardList from './CardList';
import ActionCreators from '../actions/ActionCreators'

class KanbanBoard extends Component {
    componentDidMount() {
        //init cards
        this.props.fetchCards()
    }

    render() {
       const {
            children,
            cards = []
        } = this.props
        return (
                <div className="app" >
                     <Link to='/new'className="float-button">+</Link>

                     <CardList id="todo"
                           title="To Do"
                           cards={cards.filter(
                            (card) => card.status === "todo")} />

                     <CardList id="in-progress"
                           title="In Progress"
                           cards={cards.filter(
                            (card) => card.status === "in-progress")} />

                     <CardList id="done"
                           title="Done"
                           cards={cards.filter(
                            (card) => card.status === "done")} />
                           {children}
                </div>
            )
    }
}

KanbanBoard.propTypes = {
    fetchCards: PropTypes.func.isRequired,
    cards: PropTypes.arrayOf(PropTypes.object)
}

const KanbanWithDragDrop = DragDropContext(HTML5Backend)(KanbanBoard)

const mapStateToProps = (state) => ({
   cards: state.cards
    //cards: Immutable.List(state.cards)
});

const mapDispatchToProps = (dispatch) => ({
    fetchCards: () => dispatch(ActionCreators.fetchCards())
});

export default connect(mapStateToProps,mapDispatchToProps)(KanbanWithDragDrop)


