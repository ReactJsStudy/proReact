import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import CardForm from './CardForm';
import ActionCreators from '../../actions/ActionCreators';

 class NewCard extends Component {
    constructor() {
        super()
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    componentWillMount() {
        console.log('hhh')
        this.props.createDraft()
    }

    handleChange(field, value) {
        this.props.updateDraft(field, value)
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.addCard(this.props.draft);
        browserHistory.push('/');
    }

    handleClose(e) {
         browserHistory.push('/');
    }

    render() {
        console.log(this.props)
        return (
                <CardForm draftCard={this.props.draft}
                buttonLabel="Create Card"
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleClose={this.handleClose} />

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
    router: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    draft: state.cardDraft
})

const mapDispatchToProps = (dispatch) => ({
    createDraft: () => dispatch(ActionCreators.createDraft()),
    updateDraft: (field, value) => dispatch(ActionCreators.updateDraft(field, value)),
    addCard: (draft) => dispatch(ActionCreators.addCard(draft))
})

export default connect(mapStateToProps,mapDispatchToProps)(NewCard);



