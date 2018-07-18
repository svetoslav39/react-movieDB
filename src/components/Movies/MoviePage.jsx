import React, { Component } from 'react'
import YouTube from 'react-youtube'
import remote from '../../api/requsetHandler'
import CommentPost from '../Comments/CommentPost'
import AddToFavorite from '../Favorite/AddToFavorite'

export default class MoviePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movieId: this.props.match.params.movieId,
            movie: {}
        }
    }

    async componentDidMount() {
        await remote.getMovie(this.props.match.params.movieId).then(res => {
            this.setState({ movie: res })
        })
    }

    render() {
        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 0
            }
        };
        return (
            <article id='movieHolder'>
                <h3>{this.state.movie.movieName}</h3>
                <p>{this.state.movie.movieDescription}</p>
                <YouTube
                    videoId={this.state.movie.movieTrailer}
                    opts={opts}
                    onReady={this._onReady}
                />
                <div id='SubmitionHolder'>
                    <CommentPost props={this.props.match.params.movieId} />
                    <AddToFavorite props={this.state.movie} />
                </div>
            </article>
        )
    }
    _onReady(event) {
        event.target.pauseVideo();
    }
}