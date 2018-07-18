import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import remote from '../../api/requsetHandler';
import FavoriteMovie from './FavoriteMovie';

class FavoriteView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            favoriteMovies: []
        }
    }

    async componentWillMount() {
        await remote.getFavoriteMovies(localStorage.getItem('username'))
            .then(res => this.setState({ favoriteMovies: res }))
    }
    render() {
        return (
            <div>
                {this.state.favoriteMovies.map(favoriteMovie => {
                    return <FavoriteMovie key={favoriteMovie._id} props={favoriteMovie} />

                })}
            </div>
        )
    }
}

export default withRouter(FavoriteView)
