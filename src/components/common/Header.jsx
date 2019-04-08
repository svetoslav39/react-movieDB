import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
    render() {
        const { loggedIn, onLogout, isAdmin } = this.props
        return (
            <header>
                <h1>Movie DB</h1>
                <ul>
                    <li><Link exact to='/home' activeStyle={{ color: 'red' }}>Home</Link></li>
                    {!loggedIn && <li><Link to='/login' activeStyle={{ color: 'red' }}>Login</Link></li>}
                    {!loggedIn && <li><Link to='/register' activeStyle={{ color: 'red' }}>Register</Link></li>}
                    {isAdmin && <li><Link to='/postMovie' activeStyle={{ color: 'red' }}>Upload movie</Link></li>}
                    {loggedIn && <li><Link to='/dbMovies' activeStyle={{ color: 'red' }}>Database</Link></li>}
                    {loggedIn && <li><Link to='/favoriteMovies' activeStyle={{ color: 'red' }}>Favorite Movies</Link></li>}
                </ul>
                <div id='logged'>
                    {loggedIn && <span>
                        <div id='profilePicHolder'>
                            <img id='profileImage' src={localStorage.getItem('usernameImg')} alt="profileImage" />
                        </div>
                        <div id='usernameLogged'>{localStorage.getItem('username')}
                        </div>
                        <div id='logoutHolder'>
                            <a href='javascript:void(0)' onClick={onLogout}>Logout</a>
                        </div>
                    </span>}
                </div>
            </header>
        )
    }
}