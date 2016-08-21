import React,{Component, PropTypes} from 'react';
import { browserHistory } from 'react-router'
import {Container} from 'flux/utils';
import CardForm from './CardForm';
import { connect } from 'react-redux';
import { getCard } from '../reducers';
import CardActionCreators from '../actions/CardActionCreators';

class EditCard extends Component {
    componentWillMount() {
        this.props.createDraft(this.props.card);
    }

    handleChange(field, value) {
        this.props.updateDraft(field, value);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.updateCard(this.props.card, this.props.draft);
        browserHistory.push('/');
    }

    handleClose(e) {
        browserHistory.push('/');
    }

    render() {
        return(
            <CardForm draftCard={this.props.draft}
            buttonLabel="Edit Card"
            handleChange={this.handleChange.bind(this)}
            handleSubmit={this.handleSubmit.bind(this)}
            handleClose={this.handleClose.bind(this)} />
        );
    }
}

EditCard.propTypes = {
    card: PropTypes.object,
    draft: PropTypes.object,
    createDraft: PropTypes.func.isRequired,
    updateDraft: PropTypes.func.isRequired,
    updateCard: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => (
    {
        draft: state.cardDraft,
        card: getCard(state, ownProps.params.card_id)
    }
);



const mapDispatchToProps = (dispatch) => (
    {
        createDraft: (card) => dispatch(CardActionCreators.createDraft(card)),
        updateDraft: (field, value) => dispatch(CardActionCreators.updateDraft(field, value)),
        updateCard: (card, draft) => dispatch(CardActionCreators.updateCard(card, draft))
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(EditCard);
