import React, { Component } from 'react'
import remote from '../../api/requsetHandler'
import Movie from './Movie';

export default class DatabaseMovies extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: []
        }
    }

    componentDidMount() {
        remote.getAllMovies().then(res => {
            this.setState({ movies: res })
        })
    }

    render() {
        return (
            <section className='listMovies'>
                <h1>Database</h1>
                <div>
                    {this.state.movies.map(movie => {
                        return <Movie key={movie._id} props={movie} />
                    })}
                </div>
            </section>
        )
    }
}