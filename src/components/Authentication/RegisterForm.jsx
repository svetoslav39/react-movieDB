import React, { Component } from 'react'
import Input from '../common/Input'
import remote from '../../api/requsetHandler'
import { withRouter } from 'react-router-dom'

class RegisterForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            profilePicture: '' || 'https://res.cloudinary.com/deylfhgl0/image/upload/v1531835520/moviePosters/default-img.png',
            isAdmin: false
        }
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
    }

    onChangeHandler = e => {
        let inputName = e.target.name
        let inputValue = e.target.value
        this.setState({ [inputName]: inputValue })
    }

    async onSubmitHandler(e) {
        e.preventDefault()
        if (this.state.password !== this.state.repeatPassword) {
            this.setState({
                error: 'Passwords dont match'
            })
            this.props.notify.show('Passwords dont match', 'error', 2000)
            return
        }
        let username = this.state.username
        let password = this.state.password
        let profilePicture = this.state.profilePicture
        let result = {
            username,
            password,
            profilePicture
        }
        await remote.register(result).then(
            this.props.notify.show('Successfull registration.', 'success', 2000)
        )
        this.props.history.push('/login')
    }

    render() {

        return (
            <div className='registerContainer'>
                <h1>Register</h1>
                <form onSubmit={this.onSubmitHandler}>
                    <Input
                        name='username'
                        value={this.state.username}
                        onChange={this.onChangeHandler}
                        label='Username:'
                        id=''
                    />
                    <Input
                        name='profilePicture'
                        onChange={this.onChangeHandler}
                        label='Picture url(opt):'
                        id=''
                    />
                    <Input
                        name='password'
                        value={this.state.password}
                        onChange={this.onChangeHandler}
                        label='Password:'
                        type='password'
                        id=''
                    />
                    <Input
                        name='repeatPassword'
                        onChange={this.onChangeHandler}
                        label='Repeat password:'
                        type='password'
                        id=''
                    />
                    <input type="submit" className="MovieButtons" value="Register" />
                </form>
            </div>
        )
    }
}
export default withRouter(RegisterForm)