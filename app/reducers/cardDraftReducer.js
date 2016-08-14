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

const cardDraftReducer = (
	state = defaultDraftCard(),
	action
) => {
	switch(action.type) {
		case CONST.CreateDraft:
			if(action.card) {
				return update(state, {
					$set: action.card
				})
			}
			return defaultDraftCard()
		case CONST.UpdateDraft:
			return update(state, {
				[action.field]: {
					$set: action.value
				}
			})
		default: return state
	}
}
export default cardDraftReducer