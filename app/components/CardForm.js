import React, { Component, PropTypes } from 'react'
import './card-form.css'

const CardForm = class extends Component {
	handleChange(field, e) {
		this.props.handleChange(field, e.target.value)
	}
	handleClose(e) {
		e.preventDefault()
		this.props.handleClose()
	}
	render(){
		const {
			draftCard: {
				title,
				description,
				status,
				color
			},
			handleSubmit,
			buttonLabel
		} = this.props;
		return (
			<div>
				<div className="card big">
					<form onSubmit={handleSubmit.bind(this)}>
						<p>
							<input
								type="text"
								value={title}
								onChange={this.handleChange.bind(this, 'title')}
								placeholder="Title"
								required={true}
								autoFocus={true}
							/>
							<textarea
								value={description}
								onChange={this.handleChange.bind(this, 'description')}
								placeholder="Description"
								required={true}
							/>
							<label htmlFor="status">Status</label>
							<select
								id="status"
								value={status}
								onChange={this.handleChange.bind(this, 'status')}
							>
								<option value="todo">To Do</option>
								<option value="in-progress">In Progress</option>
								<option value="done">Done</option>
							</select>
						</p>
						<p>
							<label htmlFor="color">Color</label>
							<input
								type="color"
								id="color"
								value={color}
								onChange={this.handleChange.bind(this, 'color')}
							/>
						</p>
						<div className="actions">
							<button type="submit">{buttonLabel}</button>
						</div>
					</form>
				</div>
				<div className="overlay" onClick={this.handleClose.bind(this)} />
			</div>
		)
	}
}
CardForm.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
	draftCard: PropTypes.shape({
		title: PropTypes.string,
		description: PropTypes.string,
		status: PropTypes.string,
		color: PropTypes.string
	}).isRequired,
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleClose: PropTypes.func.isRequired
}

export default CardForm