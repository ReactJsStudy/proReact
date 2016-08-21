import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import Card from './Card';
import { CARD } from '../constants';
import ActionCreators from '../actions/ActionCreators';
import Immutable from 'immutable';

const listTargetSpec = {
  hover(props, monitor) {
    const dragged = monitor.getItem();
    props.updateCardStatus(dragged.id, props.id);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

class CardList extends Component {


  render() {
    const { connectDropTarget } = this.props;
    let cards = this.props.cards.map((card) => {
      return <Card key={card.id} {...card}/>
    });

    return connectDropTarget(
      <div className="list">
        <h1>{this.props.title}</h1>
        {cards}
      </div>
    );
  }
};
CardList.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object),
  connectDropTarget: PropTypes.func.isRequired,
  updateCardStatus: PropTypes.func.isRequired
};

const DropList = DropTarget(CARD, listTargetSpec, collect)(CardList);


const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => (
  {
    updateCardStatus: (cardId, listId) => dispatch(ActionCreators.updateCardStatus(cardId, listId))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(DropList);

