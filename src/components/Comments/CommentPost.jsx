import React, { Component } from 'react'
import Input from '../common/Input';
import remote from '../../api/requsetHandler';
import { withRouter } from 'react-router-dom'
import Notifications, { notify } from 'react-notify-toast'
class CommentPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: localStorage.getItem('username'),
            movieId: '',
            comment: ''
        }
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
    }

    onChangeHandler = e => {
        let inputName = e.target.name
        let inputValue = e.target.value
        this.setState({ [inputName]: inputValue })
        this.setState({ movieId: this.props.props })
    }
    async onSubmitHandler(e) {
        e.preventDefault()
        await remote.postComment(this.state)
        this.props.history.push('/dbMovies/')
        notify.show('Comment posted', 'success', 2000)
    }

    render() {
        return (

            <form id='commentPostHolder' onSubmit={this.onSubmitHandler} >
                <Notifications />
                <Input className='commentInput'
                    name='comment'
                    onChange={this.onChangeHandler}
                    label='Comment:'
                />
                <input id='commentBtn' className='MovieButtons' type="submit" value="Post Comment" />
            </form>
        )
    }
}
export default withRouter(CommentPost)
