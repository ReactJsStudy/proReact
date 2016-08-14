import CONST from '../constants'
import kanbanAPI from '../api/kanbanAPI'

const TaskActionCreators = {
	addTask(cardId, task) {
		return dispatch => {
			dispatch({ type: CONST.RequestCreateTask, cardId, task })
			kanbanAPI.addTask(cardId, task).then(
				receivedNewTask => dispatch({
					type: CONST.RequestCreateTask,
					success: true,
					cardId,
					task: receivedNewTask,
					temporaryTaskId: task.id
				}),
				error => dispatch({
					type: CONST.ReceiveCreateTask,
					success: false,
					cardId,
					temporaryTaskId: task.id,
					error
				})
			)
		}
	},
	deleteTask(cardId, task, taskIndex) {
		return dispatch => {
			dispatch({ type: CONST.RequestDeleteTask, cardId, taskIndex })
			kanbanAPI.deleteTask(cardId, task).then(
				()=>dispatch({
					type: CONST.ReceiveDeleteTask,
					success: true,
					cardId,
					task,
					taskIndex
				}),
				error => dispatch({
					type: CONST.ReceiveDeleteTask,
					success: false,
					cardId,
					task,
					taskIndex,
					error
				})
			)
		}
	},
	toggleTask(cardId, task, taskIndex) {
		return dispatch => {
			dispatch({ type: CONST.RequestToggleTask, cardId, taskIndex })
			kanbanAPI.toggleTask(cardId, task).then(
				()=> dispatch({
					type: CONST.ReceiveToggleTask,
					success: true,
					cardId,
					task,
					taskIndex
				}),
				error => dispatch({
					type: CONST.ReceiveToggleTask,
					success: false,
					cardId,
					taskIndex,
					error
				})
			)
		}
	}
}

export default TaskActionCreators