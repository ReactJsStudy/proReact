import  React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import KanbanBoardContainer from './components/kanbanBoardContainer';
import KanbanBoard from './components/kanbanBoard';
import EditCard from './components/editCard';
import NewCard from './components/newCard';

render ((

    <Router history={createBrowserHistory()}>
    	<Route component={KanbanBoardContainer}>
    		<Route path="/" component={KanbanBoard}>
    			<Route path="new" component={NewCard} />
    			<Route path="edit/:card_id" component={EditCard} />
    		</Route>
    	</Route>
    </Router>

), document.getElementById('root'));

// let cardList = [
// 	{
// 		id: 1,
// 		title: "Read the book",
// 		description: "I should read the whole book.",
// 		color: '#bd8d31',
// 		status: "in-progress",
// 		tasks: []
// 	},
// 	{
// 		id: 2,
// 		title: "Write some code",
// 		description: "Code along with the samples in the book.\nThe complete source can be found at [github](https://github.com/pro-react)",
// 		color: '#3a7e28',
// 		status: "todo",
// 		tasks: [
// 			{
// 				id: 1,
// 				name: "ContactList Example",
// 				done: true
// 			},
// 			{
// 				id: 2,
// 				name: "Kanban Example",
// 				done: false
// 			},
// 			{
// 				id: 3,
// 				name: "My own experiments",
// 				done: false
// 			}
// 		]
// 	}
// ];

// ReactDom.render(<KanbanBoardContainer />, document.getElementById('root'));