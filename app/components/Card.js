import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import marked from 'marked'
import { DragSource, DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import CONST from '../constants'
import CheckList from './CheckList'
import { Link } from 'react-router'
import classNames from 'classnames'
import CardActionCreators from '../actions/CardActionCreators'
import './card.css'

const titlePropType = (props, propName, componentName) => {
	if(props[propName]) {
		const value = props[propName]
		if(typeof value !== 'string' || value.length > 80) {
			return new Error(`${propName} in ${componentName} is longer than 80 characters or not a string`)
		}
	}
}

const cardDragSpec = {
	beginDrag(props){ return {
		id: props.id,
		status: props.status
	}},
	endDrag(props) {
		props.persistCardDrag(props)
	}
}

const cardDropSpec = {
	hover(props, monitor) {
		const draggedId = monitor.getItem().id
		if(props.id !== draggedId) {
			props.updateCardPosition(draggedId, props.id)
		}
	}
}

const collectDrag = (connect, monitor) => {
	return {
		connectDragSource : connect.dragSource()
	}
}

const collectDrop = (connect, monitor) => {
	return {
		connectDropTarget: connect.dropTarget()
	}
}

const Card = class extends Component {
	constructor(){
		super()
		this.toggleDetails = this.toggleDetails.bind(this)
	}
	deleteCard() {
		this.props.deleteCard(this.props.id)
	}
	toggleDetails() {
		this.props.toggleCardDetails(this.props.id)
	}
	render() {
		const {
			connectDragSource,
			connectDropTarget,
			showDetails,
			description,
			id,
			tasks,
			title,
			color
		} = this.props
		let cardDetails = null;
		if(showDetails !== false) {
			cardDetails = (
				<div className="card__details">
					<span dangerouslySetInnerHTML={{__html: marked(description)}} />
					<CheckList cardId={id} tasks={tasks} />
				</div>
			)
		}
		return connectDropTarget(connectDragSource(
			<div className="card">
				<div className="sidebar" style={{backgroundColor: color}} />
				<div className="card__edit">
					<a href="javascript:;" onClick={this.deleteCard.bind(this)}>&#10005;</a>{' '}
					<Link to={`edit/${id}`}>&#9988;</Link>
				</div>
				<div
					className={classNames('card__title', {
						'card__title--is-open': !!showDetails
					})}
					onClick={this.toggleDetails}
				>
					{title}
				</div>
				<ReactCSSTransitionGroup
					transitionName="toggle"
					transitionEnterTimeout={250}
					transitionLeaveTimeout={250}
				>
					{cardDetails}
				</ReactCSSTransitionGroup>
			</div>
		))
	}
}
Card.propTypes = {
    id: PropTypes.number,
    title: titlePropType,
    description: PropTypes.string,
    color: PropTypes.string,
    tasks: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object,
    cardCallbacks: PropTypes.object,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired
}

const dragHighOrderCard = DragSource(CONST.Card, cardDragSpec, collectDrag)(Card)
const dragDropHighOrderCard = DropTarget(CONST.Card, cardDropSpec, collectDrop)(dragHighOrderCard)

const mapDispatchToProps = dispatch => ({
	deleteCard: id => dispatch(CardActionCreators.deleteCard(id)),
	persistCardDrag: props => dispatch(CardActionCreators.persistCardDrag(props)),
	updateCardPosition: (draggedId, id) => dispatch(CardActionCreators.updateCardPosition(draggedId, id)),
	toggleCardDetails: id => dispatch(CardActionCreators.toggleCardDetails(id))
})

export default connect(null, mapDispatchToProps)(dragDropHighOrderCard)