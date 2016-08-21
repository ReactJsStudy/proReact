import axios from 'axios'

axios.defaults.baseURL = 'http://kanbanapi.pro-react.com'
axios.defaults.headers.common['Authorization'] = 'gomugom'
axios.defaults.headers.post['Content-Type'] = 'application/json'

const kanbanAPI = {
	fetchCards() {
		return axios.get('/cards')
		.then(res => res.data)
	},
	addCard(card) {
		return axios.post('/cards', card)
		.then(res => res.data)
	},
	updateCard(card, draftCard) {
		return axios.put(`/cards/${card.id}`, draftCard)
		.then(res => res.data)
	},
	deleteCard(cardId) {
		return axios.delete(`/cards/${cardId}`)
		.then(res => res.data)
	},
	addTask(cardId, task) {
		return axios.post(`/cards/${cardId}/tasks`, task)
		.then(res => res.data)
	},
	deleteTask(cardId, task) {
		return axios.delete(`/cards/${cardId}/tasks/${task.id}`)
		.then(res => res.data)
	},
	toggleTask(cardId, task) {
		return axios.put(`/cards/${cardId}/tasks/${task.id}`, {
			done: !task.done
		}).then(res => res.data)
	},
	persistCardDrag(cardId, status, index) {
		return axios.put(`/cards/${cardId}`, {
			status: status,
			row_order_position: index
		}).then(res => res.data)
	}
}

export default kanbanAPI