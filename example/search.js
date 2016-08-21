import React, { Component } from 'react';
import { render } from 'react-dom';

class Search extends Component {
	constructor() {
		super();
		this.state = {
			searchTerm: "검색해요."
		};
	}

	handleChange(event) {
		this.setState({
			searchTerm: event.target.value.substr(0, 40)
		});
	}

	render() {
		return (
			<div>
				Search Term: <input type="search" value={this.state.searchTerm} onChange={this.handleChange.bind(this)} />
			</div>
		)
	}
}

Search.propTypes = {
	searchTerm: React.PropTypes.string
}

render(<Search />, document.getElementById('app'));