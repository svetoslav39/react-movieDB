import React, { Component } from 'react'
import YouTube from 'react-youtube'
import remote from '../../api/requsetHandler'
import { withRouter } from 'react-router-dom'
import Notifications, { notify } from 'react-notify-toast'


class FavoriteMovie extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isWatched: null
        }
        this.changeStatus = this.changeStatus.bind(this)
    }

    async changeStatus() {
        await remote.addOrUpdateFavoriteMovie(this.props.props._id, {
            username: localStorage.getItem('username'),
            movieName: this.props.props.movieName,
            movieId: this.props.props.movieId,
            movieTrailer: this.props.props.movieTrailer,
            isWatched: true
        })
            .then(res => console.log(res))
        this.props.history.push('/dbMovies')
        notify.show(`${this.props.props.movieName} is watched`, 'success', 2000)
    }
    onFavoriteDelete = () => {
        remote.deteleFavoriteMovie(this.props.props._id)
        this.props.history.push('/dbMovies')
        notify.show(`${this.props.props.movieName} is deleted`, 'success', 2000)

    }

    render() {
        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 0
            }
        }
        return (
            <div className='favoriteMovie'>
                <Notifications />
                <h3>{this.props.props.movieName}</h3>
                <YouTube
                    videoId={this.props.props.movieTrailer}
                    opts={opts}
                    onReady={this._onReady}
                />
                <div className='favBtnHolder'>
                    {this.props.props.isWatched === false ?
                        <input className='changeToWatched' onClick={this.changeStatus} type="button" value="Change to watched" /> :
                        <div>
                            <input onClick={this.changeStatus} className='watchedBtn' type="button" value="Watched" disabled={true} />
                            <input onClick={this.onFavoriteDelete} className='MovieButtons' type="button" value="Delete" />
                        </div>
                    }
                </div>
            </div>
        )
    }
    _onReady(event) {
        event.target.pauseVideo();
    }
}
export default withRouter(FavoriteMovie)