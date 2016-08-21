import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ActionCreators from '../actions/ActionCreators';

class CheckList extends Component {
    checkInputKeyPress(evt) {
        if (evt.key === 'Enter') {
            let newTask = {id:Date.now(), name:evt.target.value, done:false};
            this.props.addTask(this.props.cardId, newTask);
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
                this.props.toggleTask.bind(null, this.props.cardId, task, taskIndex)
                }/>
                {task.name}{' '}
                <a href="#" className="checklist_task--remove" onClick={
                    this.props.deleteTask.bind(null, this.props.cardId,
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
    addTask: PropTypes.func.isRequired,
    toggleTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    addTask: (cardId, newTask) => dispatch(ActionCreators.addTask(cardId, newTask)),
    toggleTask: (cardId, task, taskIndex) => dispatch(ActionCreators.toggleTask(cardId, task, taskIndex)),
    deleteTask: (cardId, task, taskIndex) => dispatch(ActionCreators.deleteTask(cardId, task, taskIndex))
})

export default connect(mapStateToProps,mapDispatchToProps)(CheckList);


