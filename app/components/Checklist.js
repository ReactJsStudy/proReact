import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux'
import TaskActionCreators from '../actions/TaskActionCreators'

class Checklist extends Component {
    checkInputKeyPress(e){
        if(e.key === 'Enter'){
            const { addTask, cardId } = this.props
            const newTask = { id: Date.now(), name: e.target.value, done: false }
            addTask(cardId, newTask)
            e.target.value = ''
        }
    }
    render(){
        const {
            tasks,
            cardId,
            toggleTask,
            deleteTask
        } = this.props
        const renderTasks = tasks.map((task, taskIndex) => (
            <li className="checklist__task" key={'checklist'+task.id}>
                <label>
                    <input
                        type="checkbox"
                        checked={task.done}
                        onChange={toggleTask.bind(null, cardId, task, taskIndex)}
                    />
                    {task.name}
                </label>
                <a
                    href="javascript:;"
                    className="checklist__task--remove"
                    onClick={deleteTask.bind(null, cardId, task, taskIndex)}
                />
            </li>
        ));
        return (
            <div className="checklist">
                <ul>{renderTasks}</ul>
                <input
                    type="text"
                    className="checklist--add-task"
                    placeholder="Type then hit Enter to add a task"
                    onKeyPress={this.checkInputKeyPress.bind(this)}
                />
            </div>
        );
    }
}
Checklist.propTypes = {
    cardId: PropTypes.number,
    tasks: PropTypes.arrayOf(PropTypes.object),
    addTask: PropTypes.func.isRequired,
    toggleTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
    addTask: (cardId, newTask) => dispatch(TaskActionCreators.addTask(cardId, newTask)),
    toggleTask: (cardId, task, taskIndex) => dispatch(TaskActionCreators.toggleTask(cardId, task, taskIndex)),
    deleteTask: (cardId, task, taskIndex) => dispatch(TaskActionCreators.deleteTask(cardId, task, taskIndex))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checklist)