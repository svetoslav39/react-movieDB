import React, { Component } from 'react'
import Input from '../common/Input';
import remote from '../../api/requsetHandler';
import { withRouter } from 'react-router-dom'

class PostMovie extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movieName: '',
            moviePoster: '',
            movieDescription: '',
            movieTrailer: ''
        }
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
    }

    onChangeHandler = e => {
        let inputName = e.target.name
        let inputValue = e.target.value
        if (inputName === 'movieTrailer') {
            let videoId = inputValue.split('v=')[1]
            this.setState({ [inputName]: videoId })
            return
        }
        this.setState({ [inputName]: inputValue })
    }

    async onSubmitHandler(e) {
        e.preventDefault()
        await remote.postMovie(this.state)
        this.props.history.push('/dbMovies')

    }

    render() {
        return (
            <div className='postMovie'>
                <h1>Upload movie</h1>
                <form onSubmit={this.onSubmitHandler}>
                    <Input
                        name='movieName'
                        value={this.state.movieName}
                        onChange={this.onChangeHandler}
                        label='Movie name:'
                    />
                    <Input
                        name='moviePoster'
                        value={this.state.moviePoster}
                        onChange={this.onChangeHandler}
                        label='Poster url:'
                    />
                    <Input
                        name='movieDescription'
                        value={this.state.movieDescription}
                        onChange={this.onChangeHandler}
                        label='Description:'
                    />
                    <Input
                        name='movieTrailer'
                        onChange={this.onChangeHandler}
                        label='movie Trailer:'
                    />
                    <input type="submit" className="btn btn-primary" value="Upload" /></form>
            </div>
        )
    }
}
export default withRouter(PostMovie)