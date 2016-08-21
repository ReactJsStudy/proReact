import React,{Component, PropTypes} from 'react';
import { browserHistory } from 'react-router'
import {Container} from 'flux/utils';
import CardForm from './CardForm';
import CardStore from '../stores/CardStore';
import DraftStore from '../stores/DraftStore';
import CardActionCreators from '../actions/CardActionCreators';

class EditCard extends Component {
    componentWillMount() {
        let card = CardStore.getCard(this.props.params.card_id);
        setTimeout( _ => CardActionCreators.createDraft(card), 0 );
    }

    handleChange(field, value) {
        CardActionCreators.updateDraft(field, value);
    }

    handleSubmit(e) {
        e.preventDefault();
        let card = CardStore.getCard(this.props.params.card_id);
        CardActionCreators.updateCard(card, this.state.draft);
        browserHistory.push('/');
    }

    handleClose(e) {
        browserHistory.push('/');
    }

    render() {
        return(
            <CardForm draftCard={this.state.draft}
                buttonLabel="Edit Card"
                handleChange={this.handleChange.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
                handleClose={this.handleClose.bind(this)} />
        );
    }
}

EditCard.getStores = _ => ([DraftStore]);
EditCard.calculateState = prevState => ({
        draft : DraftStore.getState()
});
export default Container.create(EditCard);
