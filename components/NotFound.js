import React , { Component } from 'react'
import { connect } from 'react-redux'

class NotFound extends Component {
    render() {
        return (
            <div>
                <h2>OOps Page Not Found</h2>
            </div>
            )
    }

}
const mapStateToProps = (state) => ({ });
const mapDispatchToProps = (dispatch) => ({ });

export default connect(mapStateToProps,mapDispatchToProps)(NotFound);
