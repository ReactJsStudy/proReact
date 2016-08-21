/**
 * 사용자 상호작용이 주로 수행되는 컴포넌트다.
 */
import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CheckList from './CheckList';
import marked from 'marked';
import { DragSource, DropTarget } from 'react-dnd';
import { Link } from 'react-router';
import constants from '../constants';
import CardActionCreators from '../actions/CardActionCreators';

let titlePropType = (props, propName, componentName) => {
    if ( props[propName]) {
        let value = props[propName];
        if ( typeof value !== 'string' || value.length > 80 ) {
            return new Error (
                `${propName} in ${componentName} is longer than 80 charters`
            );
        }
    }
}

const cardDragSpec = {
    beginDrag(props) {
        return {
            id : props.id,
            status:props.status
        };
    },
    endDrag(props) {
        CardActionCreators.persistCardDrag(props);
    }
}

const cardDropSpec = {
    hover(props, monitor) {
        CardActionCreators.updateCardPosition(monitor.getItem().id, props.id);
    }
}

let collectDrag = (con, moni) => {
    return {
        connectDragSource : con.dragSource()
    }
}

let collectDrop = (connect, monitor) => {
    return {
        connectDropTarget : connect.dropTarget()
    }
}

class Card extends Component
{

    toggleDetails() {
        CardActionCreators.toggleCardDetails(this.props.id);
    }

    render() {
        const { connectDragSource, connectDropTarget } = this.props;
        let cardDetails;
        let sideColor = {
            position : 'absolute',
            zIndex : -1,
            top : 0,
            bottom : 0,
            left : 0,
            width : 7,
            backgroundColor : this.props.color
        };

        if ( !!this.props.showDetails ) {
            cardDetails = (
                <div className="card__details">
                    <span dangerouslySetInnerHTML={{__html:marked(this.props.description)}} />
                    {/*this.props.description*/}
                    <CheckList cardId={this.props.id} tasks={this.props.tasks} />
                </div>
            );
        }
        return connectDropTarget(connectDragSource(
            <div className="card">
                <div style={sideColor} />
                <div className="card__edit"><Link to={'/edit/'+this.props.id}>&#9998;</Link></div>
                <div className={ !!this.props.showDetails ? "card__title card__title--is-open" : "card__title"}
                    onClick={this.toggleDetails.bind(this)}>
                    {this.props.title}
                </div>
                <ReactCSSTransitionGroup transitionName="toggle"
                    transitionEnterTimeout={250}
                    transitionLeaveTimeout={250} >
                {cardDetails}
                </ReactCSSTransitionGroup>
            </div>
        ));
    };
}

Card.propTypes = {
    id : PropTypes.number,
    title : titlePropType,
    description : PropTypes.string,
    color : PropTypes.string,
    taksks : PropTypes.arrayOf(PropTypes.object),
    connectDragSource : PropTypes.func.isRequired,
    connectDropTarget : PropTypes.func.isRequired
}

const dragHighOrderCard = DragSource(constants.CARD, cardDragSpec, collectDrag)(Card);
const dragDropHighOrderCard = DropTarget(constants.CARD, cardDropSpec, collectDrop)(dragHighOrderCard);

export default dragDropHighOrderCard;
