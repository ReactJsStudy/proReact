import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import kanbanStore from './store/kanbanStore';
import KanbanBoard from './components/KanbanBoard';
import EditCard from './components/new_edit/EditCard';
import NewCard  from './components/new_edit/NewCard';


render((
  <Provider store={kanbanStore}>
    <Router history={browserHistory}>
      <Route path="/" component={KanbanBoard}>
        <Route path="new" component={NewCard} />
        <Route path="edit/:card_id" component={EditCard} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));

//최상위 컴포넌트와 라우터를 랜더한다.

