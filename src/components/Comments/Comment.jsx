import React, { Component } from 'react'
import dateConvert from '../../api/dateConvertor'
import remote from '../../api/requsetHandler'
import { withRouter } from 'react-router-dom'
import Notifications, { notify } from 'react-notify-toast'

class Comment extends Component {

    adminDeleteComment = () => {
        remote.adminDeleteComment(this.props.props._id)
        this.props.history.push('/dbMovies')
        notify.show('Comment deleted', 'success', 2000)
    }
    render() {
        return (
            <div id='commentList'>
                <Notifications />
                <p>{this.props.props.comment}</p>
                <p>
                    posted: {dateConvert(this.props.props._kmd.lmt)} ago by {this.props.props.username}
                </p>
                {localStorage.getItem('userId') === '5b448b32bd5eaf2e6d0305ff'
                    ?
                    <input onClick={this.adminDeleteComment} type="button" value="Delete comment" /> :
                    null
                }
            </div>
        )
    }
}
export default withRouter(Comment)