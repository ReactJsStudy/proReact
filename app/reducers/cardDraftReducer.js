import CONST from '../constants'
import update from 'react-addons-update'

const defaultDraftCard = () => {
	return {
		id: Date.now(),
		title: '',
		description: '',
		status: 'todo',
		color: '#c9c9c9',
		tasks: []
	}
}

const cardDraftReducer = {
	[CONST.CreateDraft]: (state, {card}) => {
		return card ? update(state, {
			$set: card
		}) : defaultDraftCard()
	},
	[CONST.UpdateDraft]: (state, {field, value}) => {
		return update(state, {
			[field]: {
				$set: value
			}
		})
	}
}
export default (state = defaultDraftCard(), action) =>
	cardDraftReducer[action.type] ? cardDraftReducer[action.type](state, action) : state