import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import remote from '../../api/requsetHandler';
import Comment from '../Comments/Comment';
import Notifications, { notify } from 'react-notify-toast'

class Movie extends Component {
    constructor(props) {
        super(props)

        this.state = {
            movie: {},
            comments: []
        }
        this.onRedirectMovie = this.onRedirectMovie.bind(this)
    }
    async componentDidMount() {
        await remote.getCommentsMovie(this.props.props._id).then(res => {
            this.setState({ comments: res })
        })
    }
    onRedirectMovie(e) {
        e.preventDefault()
        this.props.history.push(`/dbMovies/${this.props.props._id}`)
    }
    adminDeleteMovie = () => {
        remote.adminDeleteMovie(this.props.props._id)
        this.props.history.push(`/dbMovies`)
        notify.show(`${this.props.props.movieName} deleted.`, 'success', 2000)
    }
    render() {
        return (
            <article>
                <Notifications />
                <div id='movieNameHolder'>
                    <div id='movieName'>
                        <NavLink to='' onClick={this.onRedirectMovie}>{this.props.props.movieName}</NavLink>
                    </div>
                </div>
                <img onClick={this.onRedirectMovie} src={this.props.props.moviePoster} alt={this.props.props.movieName} />
                <div>
                    {localStorage.getItem('userId') === '5b448b32bd5eaf2e6d0305ff'
                        ?
                        <input onClick={this.adminDeleteMovie} type="button" value="Delete movie" /> :
                        null
                    }
                </div>
                <div id='commentWrapper'>
                    <h4 className='commentHeader'>Comments:</h4>
                    {this.state.comments.length > 0 ? this.state.comments.map(comment => {
                        return <Comment key={comment._id} props={comment} />
                    }) : <p id='noComments'>still no comments</p>}
                </div>
            </article>
        )
    }

}
export default withRouter(Movie)