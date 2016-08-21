import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

import kanbanStore from './reducers/store'
import KanbanBoard from './components/KanbanBoard'
import EditCard from './components/EditCard'
import NewCard from './components/NewCard'

import './app.css'

render((
    <Provider store={kanbanStore}>
		<Router history={browserHistory}>
			<Route path="/" component={KanbanBoard}>
				<Route path="new" component={NewCard} />
				<Route path="edit/:card_id" component={EditCard} />
			</Route>
		</Router>
	</Provider>
), document.getElementById('root'))