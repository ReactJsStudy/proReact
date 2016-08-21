import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import CardForm from './CardForm'
import CardActionCreators from '../actions/CardActionCreators'

const NewCard = class extends Component {
	constructor() {
		super()
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleClose = this.handleClose.bind(this)
	}
	componentDidMount() {
		this.props.createDraft()
	}
	handleChange(field, value) {
		this.props.updateDraft(field, value)
	}
	handleSubmit(e) {
		e.preventDefault()
		this.props.addCard(this.props.draft)
		this.context.router.push('/')
	}
	handleClose(e) {
		this.context.router.push('/')
	}
	render() {
		return (
			<CardForm
				draftCard={this.props.draft}
				buttonLabel="Create Card"
				handleChange={this.handleChange}
				handleSubmit={this.handleSubmit}
				handleClose={this.handleClose}
			/>
		)
	}
}
NewCard.propTypes = {
	draft: PropTypes.object,
	createDraft: PropTypes.func.isRequired,
	updateDraft: PropTypes.func.isRequired,
	addCard: PropTypes.func.isRequired
}
NewCard.contextTypes = {
	router: React.PropTypes.object.isRequired
}

const mapStateToProps = state => ({ draft: state.cardDraft })
const mapDispatchToProps = dispatch => ({
	createDraft: ()=> dispatch(CardActionCreators.createDraft()),
	updateDraft: (field, value) => dispatch(CardActionCreators.updateDraft(field, value)),
	addCard: draft => dispatch(CardActionCreators.addCard(draft))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewCard)