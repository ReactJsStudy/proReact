import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import Card from './Card'
import CONST from '../constants'
import CardActionCreators from '../actions/CardActionCreators'

const listTargetSpec = {
	hover(props, monitor) {
		const dragged = monitor.getItem()
		props.updateCardStatus(dragged.id, props.id)
	}
}
const collect = (connect, monitor) => ({ connectDropTarget: connect.dropTarget() })

class CardList extends Component {
	render(){
		const {
			connectDropTarget,
			cards,
			title
		} = this.props
		const renderCards = cards.map(card => ( <Card key={'card'+card.id} {...card} /> ));
		return connectDropTarget(
			<div className="list">
				<h1>{title}</h1>
				{renderCards}
			</div>
		)
	}
}
CardList.propTypes = {
	title: PropTypes.string.isRequired,
	cards: PropTypes.arrayOf(PropTypes.object),
	connectDropTarget: PropTypes.func.isRequired,
	updateCardStatus: PropTypes.func.isRequired
}
const DropList = DropTarget(CONST.Card, listTargetSpec, collect)(CardList)

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
	updateCardStatus: (cardId, listId) => dispatch(CardActionCreators.updateCardStatus(cardId, listId))
})
export default connect(mapStateToProps, mapDispatchToProps)(DropList)