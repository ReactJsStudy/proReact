import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux'
import kanbanStore from './store/kanbanStore';
import KanbanBoard from './components/KanbanBoard';
import EditCard from './components/EditCard';
import NewCard from './components/NewCard';


ReactDom.render((
    <Provider store={kanbanStore}>
        <Router history={browserHistory} >
            <Route path="/" component={KanbanBoard} >
                <Route path="new" component={NewCard} />
                <Route path="edit/:card_id" component={EditCard} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('root'));
