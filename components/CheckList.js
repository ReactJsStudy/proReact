import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ActionCreators from '../actions/ActionCreators';

import { bindActionCreators } from 'redux';

class CheckList extends Component {
    checkInputKeyPress(evt) {
        if (evt.key === 'Enter') {
            let newTask = {id:Date.now(), name:evt.target.value, done:false};
            this.props.actions.addTask(this.props.cardId, newTask);
            evt.target.value = '';
        }
    }

    render() {
        let tasks = this.props.tasks.map((task, taskIndex) => (
            <li className="checklist__task" key={task.id}  >
                <input
                type="checkbox"
                defaultChecked={task.done}
                onChange={
                this.props.actions.toggleTask.bind(null, this.props.cardId, task, taskIndex)
                }/>
                {task.name}{' '}
                <a href="#" className="checklist_task--remove" onClick={
                    this.props.actions.deleteTask.bind(null, this.props.cardId,
                        task, taskIndex)} />
            </li>
            ));

        return (
                <div className="checklist" >
                    <ul>{tasks}</ul>
                    <input type="text" className="checklist-add-task"
                    placeholder="Type then hit Enter to add a task"
                    onKeyPress={this.checkInputKeyPress.bind(this)} />
                </div>
            )
    }
}

CheckList.propTypes = {
    cardId: PropTypes.number,
    tasks: PropTypes.arrayOf(PropTypes.object),
    actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(ActionCreators, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(CheckList);


