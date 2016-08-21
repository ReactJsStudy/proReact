import React, { Component } from 'react';
import update from 'react-addons-update';
import { throttle } from './util';
import KanbanBoard from './kanbanBoard';
import 'babel-polyfill';
import 'whatwg-fetch';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADER = {
	'Content-Type': 'application/json',
	Authorization: 'any-string-you-like'
};

class KanbanBoardContainer extends Component {
	constructor(){
		super(...arguments);
		this.state = {
			cards: []
		};
		this.updateCardStatus = throttle(this.updateCardStatus.bind(this));
		this.updateCardPosition = throttle(this.updateCardPosition.bind(this));
	}

	componentDidMount() {
		fetch(API_URL + '/cards', {headers: API_HEADER})
		.then((response) => response.json())
		.then((responseData) => {
			this.setState({ cards: responseData });
		});
	}

	addTask(cardId, taskName) {
		let prevState = this.state;
		let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
		let newTask = {
			id:Date.now(),
			name:taskName,
			done: false
		};
		let nextState = update(this.state.cards, {
			[cardIndex]: {
				tasks: {
					$push: [newTask]
				}
			}
		});
		this.setState({ cards: nextState });

		fetch(`${API_URL}/cards/${cardId}/tasks`, {
			method: 'post',
			headers: API_HEADER,
			body: JSON.stringify(newTask)
		})
		.then((response) => {
			if ( response.ok ) {
				return response.json()
			} else {
				throw new Error('Server response wasn\'t OK');
			}
		})
		.then((responseData) => {
			newTask.id = responseData.id;
			this.setState({ cards: nextState })
		})
		.catch((error) => {
			this.setState(prevState);
		});
	}

	deleteTask(cardId, taskId, taskIndex) {
		let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);

		console.log(this.state.cards);

		let nextState = update(this.state.cards, {
			[cardIndex]: {
				tasks: {
					$splice: [[taskIndex, 1]]
				}
			}
		});

		let prevState = this.state;

		this.setState({ cards: nextState });

		fetch(`${API_URL}/card/${cardId}/tasks/${taskId}`, {
			method: 'delete',
			headers: API_HEADER
		})
		.then((response) => {
			if ( !response.ok ) {
				throw new Error('Server response wasn\'t OK');
			}
		})
		.catch((error) => {
			this.setState(prevState);
		})
	}

	toggleTask(cardId, taskId, taskIndex) {
		let prevState = this.state;
		let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
		let newDoneValue;
		let nextState = update(this.state.cards, {
			[cardIndex]: {
				tasks: {
					[taskIndex]: {
						done: {
							$apply: (done) => {
								newDoneValue = !done;
								return newDoneValue;
							}
						}
					}
				}
			}
		});

		this.setState({ cards: nextState });

		fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
			method: 'put',
			headers: API_HEADER,
			body: JSON.stringify({done: newDoneValue})
		})
		.then((response) => {
			if ( !response.ok ) {
				throw new Error('Server response wasn\'t OK');
			}
		})
		.catch((error) => {
			console.error('Fetch error : ', error);
			this.setState(prevState);
		})
	}

	updateCardStatus(cardId, listId) {
		let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
		let card = this.state.cards[cardIndex];
		if ( card.status !== listId ) {
			this.setState(update(this.state, {
				cards: {
					[cardIndex]: {
						status: {
							$set: listId
						}
					}
				}
			}));
		}
	}

	updateCardPosition(cardId, afterId) {
		if ( cardId !== afterId ) {
			let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
			let card = this.state.cards[cardIndex];
			let afterIndex = this.state.cards.findIndex((card) => card.id == afterId);
			this.setState(update(this.state, {
                cards: {
                    $splice : [
                        [cardIndex, 1], [afterIndex, 0, card]
                    ]
                }
            }));
		}
	}

	persistCardDrag(cardId, status) {
		let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
		let card = this.state.cards[cardIndex];

		fetch(`${API_URL}/cards/${cardId}`, {
			method: 'put',
			headers: API_HEADER,
			body : JSON.stringify({status: status, row_order_position:cardIndex})
		})
		.then((response) => {
			if ( !response.ok ) {
				throw new Error('Server response wasn\'t OK');
			}
		})
		.catch((error) => {
			console.error('Fetch error: ', error);
			this.setState(update(this.state, {
				cards: {
					[cardIndex]: {
						status: {
							$set: status
						}
					}
				}
			}));
		});
	}

	addCard(card){
		//낙관적인 UI변경을 되돌려야 하는 경우를 대비해
		// 변경하기 전 원래 상태에 대한 참조를 저장한다
		let prevState = this.state;

		//카드에 임시 ID를 부여한다
		if ( card.id === null ) {
			let card = Object.assign({}, card, {id: Date.now()});
		}

		//새로운 객체를 생성하고 카드의 배열로 새로운 카드를 푸시한다.
		let nextState = update(this.state.cards, { $push: [card] });

		//변경된 객체로 컴포넌트 상태를 설정한다.
		this.setState({ cards: nextState });

		//API를 호출해 서버에 카드를 추가한다.
		fetch(`${API_URL}/cards`, {
			method: 'post',
			headers: API_HEADER,
			body: JSON.stringify(card)
		})
		.then((response) => {
			if(response.ok){
				return response.json();
			} else {
				//서버 응답이 정상이 아닌경우
				//오류를 생성해 UI에 대한 낙관적인 변경을
				//원래대로 되돌린다.
				throw new Error("Server response wasn\'t OK");
			}
		})
		.then((responseData) => {
			//서버가 새로운 카드를 추가하는데 이용한 확정 ID를 반환하면 리액트에서 ID를 업데이트 한다.
			card.id = responseData.id;
			this.setState({ cards: nextState });
		}).catch((error) => {
			this.setState({prevState});
		});
	}

	updateCard(card){
		//낙관적인 UI변경을 되돌려야 하는 경우를 대비해 변경하기 전 원래 상태에 대한 참조를 저장한다.
		let prevState = this.state;

		//카드의 인덱스를 찾는다.
		let cardIndex = this.state.cards.findIndex((c) => c.id == card.id);

		//$set 명령을 이용해 카드 전체를 변경한다.
		let nextState = update( this.state.cards, {
			[cardIndex]: { $set: card }
		});

		//변경된 객체로 컴포넌트 상태를 설정한다.
		this.setState({ cards: nextState });

		//API를 호출해 서버에서 카드를 업데이트 한다.
		fetch(`${API_URL}/cards/${card.id}`, {
			method: 'put',
			headers: API_HEADER,
			body: JSON.stringify(card)
		})
		.then((response) => {
			if ( !response.ok ) {
				//서버 응답이 정상이 아닌경우 오류를 생성해 UI에 대한 낙관적인 변경을 원래대로 되돌린다.
				throw new Error("Server response wasn\'t OK");
			}
		})
		.catch((error) => {
			console.error("Fetch error:", error);
			this.setState(prevState);
		})
	}

	render() {
		let KanbanBoard = this.props.children && React.cloneElement(this.props.children, {
			cards : this.state.cards,
			taskCallbacks : {
				toggle : this.toggleTask.bind(this),
				delete : this.deleteTask.bind(this),
				add : this.addTask.bind(this)
			},
			cardCallbacks : {
				updateStatus:this.updateCardStatus,
				updatePosition:this.updateCardPosition,
				addCard : this.addCard.bind(this),
				updateCard : this.updateCard.bind(this),
				persistCardDrag:this.persistCardDrag.bind(this)
			}
		});

		return KanbanBoard;
	}
};

export default KanbanBoardContainer;