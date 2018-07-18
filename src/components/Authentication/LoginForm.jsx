import React, { Component } from 'react'
import Input from '../common/Input'
import remote from '../../api/requsetHandler'
import { withRouter } from 'react-router-dom'

class LoginPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
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
        await remote.login(this.state).then(res => {
            if (res.error) {
                this.setState({ error: res.error })
                this.props.notify.show('Try again', 'error', 2000)
                return
            }
            this.props.notify.show('Successfull login.', 'success', 2000)
            localStorage.setItem('token', res._kmd.authtoken)
            localStorage.setItem('userId', res._id)
            localStorage.setItem('username', res.username)
            localStorage.setItem('usernameImg', res.profilePicture)
            this.props.history.push('/dbMovies')
        })
    }

    render() {
        return (
            <div>
                <div className='loginContainer'>
                    <h1>Login</h1>
                    <form onSubmit={this.onSubmitHandler}>
                        <Input

                            name='username'
                            value={this.state.username}
                            onChange={this.onChangeHandler}
                            label='Username:'
                        />
                        <Input
                            name='password'
                            type='password'
                            // value={this.state.pasword}
                            onChange={this.onChangeHandler}
                            label='Password:'
                        />
                        <input classNam='MovieButtons' type="submit" className="MovieButtons" value="Login" />
                    </form>
                </div>
            </div>
        )
    }
}
export default withRouter(LoginPage)