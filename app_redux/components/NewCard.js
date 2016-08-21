import React,{Component, PropTypes} from 'react';
import { browserHistory } from 'react-router'
import { connect } from 'react-redux';
import CardForm from './CardForm';
import CardActionCreators from '../actions/CardActionCreators';

class NewCard extends Component {

    componentWillMount() {
        this.props.createDraft();
    }

    handleChange(field, value) {
        this.props.updateDraft(field, value);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.addCard(this.state.draft);
        browserHistory.push('/');
    }

    handleClose(e) {
        browserHistory.push('/');
    }

    render() {
        return(
            <CardForm draftCard={this.props.draft}
                buttonLabel="Create Card"
                handleChange={this.handleChange.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
                handleClose={this.handleClose.bind(this)} />
        );
    }
}

NewCard.propTypes = {
  draft: PropTypes.object,
  createDraft: PropTypes.func.isRequired,
  updateDraft: PropTypes.func.isRequired,
  addCard: PropTypes.func.isRequired,
}

let mapStateToProps = state => ({draft : state.cardDraft});
let mapDispatchToProps = dispatch => (
    {
        createDraft : _ => dispatch(CardActionCreators.createDraft()),
        updateDraft : (field, value) => dispatch(CardActionCreators.updateDraft(field, value)),
        addCard : (draft) => dispatch(CardActionCreators.addCard(draft))
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(NewCard);