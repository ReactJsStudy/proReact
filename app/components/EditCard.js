import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getCard } from '../reducers/store'
import CardForm from './CardForm'
import CardActionCreators from '../actions/CardActionCreators'

const EditCard = class extends Component {
	constructor() {
		super()
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleClose = this.handleClose.bind(this)
	}
	componentDidMount() {
		this.props.createDraft(this.props.card)
	}
	handleChange(field, value) {
		this.props.updateDraft(field, value)
	}
	handleSubmit(e) {
		const {updateCard, card, draft } = this.props
		e.preventDefault()
		updateCard(card, draft)
		this.context.router.push('/')
	}
	handleClose(e) {
		this.context.router.push('/')
	}
	render() {
		return (
			<CardForm
				draftCard={this.props.draft}
				buttonLabel="Edit Card"
				handleChange={this.handleChange}
				handleSubmit={this.handleSubmit}
				handleClose={this.handleClose}
			/>
		)
	}
}
EditCard.propTypes = {
	cardCallbacks: PropTypes.object,
	draft: PropTypes.object,
	createDraft: PropTypes.func.isRequired,
	updateDraft: PropTypes.func.isRequired,
	updateCard: PropTypes.func.isRequired
}
EditCard.contextTypes = {
	router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
	return {
		draft: state.cardDraft,
		card: getCard(state, ownProps.params.card_id)
	}
}

const mapDispatchToProps = dispatch => ({
	createDraft: card => dispatch(CardActionCreators.createDraft(card)),
	updateDraft: (field, value) => dispatch(CardActionCreators.updateDraft(field, value)),
	updateCard: (card, draft) => dispatch(CardActionCreators.updateCard(card, draft))
})
export default connect(mapStateToProps, mapDispatchToProps)(EditCard)