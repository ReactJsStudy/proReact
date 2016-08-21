import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

//주 컴포넌트이며 SearchBar와 ContactList를 렌더링
class ContactsApp extends Component {
	constructor(){
		super();
		this.state = {
			filterText: ''
		}
	}

	handleUserInput(searchTerm){
		this.setState({filterText: searchTerm});
	}

	render() {
		return(
			<div>
				<SearchBar filterText={this.state.filterText}
							onUserInput={this.handleUserInput.bind(this)} />
				<ContactList contacts={this.props.contacts}
							 filterText={this.state.filterText} />
			</div>
		)
	}
}

ContactsApp.propTypes = {
	contacts: PropTypes.arrayOf(PropTypes.object)
}

class SearchBar extends Component {
	handleChange(event){
		this.props.onUserInput(event.target.value);
	}

	render(){
		return(
			<input type="text" placeholder="search" value={this.props.filterText} 
					onChange={this.handleChange.bind(this)} />
		)
	}
}

//새로운 propTypes를 추가해야 한다.
SearchBar.propTypes ={
	onUserInput: PropTypes.func.isRequired,
	filterText: PropTypes.string.isRequired
}

class ContactList extends Component {
	render() {
		let filteredContacts = this.props.contacts.filter((contact) => {
			return contact.name.indexOf(this.props.filterText) !== -1
		});

		return (
			<ul>
				{filteredContacts.map(
					(contact) => <ContactItem key={contact.email}
											  name={contact.name}
											  email={contact.email} />
				)}
			</ul>
		)
	}
}

ContactList.propTypes = {
	contact: PropTypes.arrayOf(PropTypes.object),
	filterText: PropTypes.string.isRequired
}

class ContactItem extends Component {
	render() {
		return <li>{this.props.name} - {this.props.email}</li>
	}
}

ContactItem.propTypes = {
	name: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired
}

const contacts = [
	{name: "Cassio zen", email: "cassiozen@gmail.com"},
	{name: "Dan Avramov", email: "gaearon@somewhere.com"},
	{name: "Pete Hunt", email: "floydophone#somewhere.com"},
	{name: "Paul O'Shannessy", email: "zpao@somewhere.com"},
	{name: "Ryan Folorence", email: "rpflorence@somewhere.com"},
	{name: "Sebastia Markbage", email: "sebmarkbage@hero.com"}
]

render(<ContactsApp contacts={contacts} />, document.getElementById('app'));