import React from 'react';
import YouTube from 'react-youtube';

class MovieTrailer extends React.Component {
    render() {
        const opts = {
            height: '185',
            width: '320',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 0
            }
        };

        return (
            <YouTube
                videoId={this.props.MovieTrailer}
                opts={opts}
                onReady={this._onReady}
            />
        );
    }

    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }
}
export default MovieTrailer