const appKey = 'kid_HJaMoZz7m';
const appSecret = '1b67541e1d104b3f88e468f3634255e6';
const hostUrl = 'https://baas.kinvey.com';
const publicToken = 'cc4dda2c-7dce-4a9a-8ac3-8172a100b34d.AyBvInAYVYd/YKVyutsqL9zxf6an0pJvZk+WsjWl8/s='

let remote = {
    login: (payload) => (
        fetch(`${hostUrl}/user/${appKey}/login`, {
            method: 'POST',
            headers: {
                Authorization: 'Basic ' + btoa(`${appKey}:${appSecret}`),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(res => (res.json()))
    ),
    register: (payload) => (
        fetch(`${hostUrl}/user/${appKey}`, {
            method: 'POST',
            headers: {
                Authorization: 'Basic ' + btoa(`${appKey}:${appSecret}`),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(res => (res.json()))
    ),
    postMovie: (data) => (
        fetch(`${hostUrl}/appdata/${appKey}/movies`, {
            method: 'POST',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => (res.json()))
    ),
    getAllMovies: () => (
        fetch(`${hostUrl}/appdata/${appKey}/movies?query={}&sort={"_kmd.ect": -1}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token')
            }
        })
        .then(res => (res.json()))
    ),
    getAllPublicMovies: () => (
        fetch(`${hostUrl}/appdata/${appKey}/movies?query={}&sort={"_kmd.ect": -1}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + publicToken
            }
        })
        .then(res => (res.json()))
    ),
    getMovie: (id) => (
        fetch(`${hostUrl}/appdata/${appKey}/movies/${id}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token')
            }
        })
        .then(res => (res.json()))

    ), getPublicMovie: (id) => (
        fetch(`${hostUrl}/appdata/${appKey}/movies/${id}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + publicToken
            }
        })
        .then(res => (res.json()))

    ),
    postComment: (data) => (
        fetch(`${hostUrl}/appdata/${appKey}/comments`, {
            method: 'POST',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => (res.json()))
    ),
    getCommentsMovie: (movieId) => (
        fetch(`${hostUrl}/appdata/${appKey}/comments?query={"movieId":"${movieId}"}&sort={"_kmd.ect": -1}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        })
        .then(res => (res.json()))
    ),
    addOrUpdateFavoriteMovie: (movieId, data) => (
        fetch(`${hostUrl}/appdata/${appKey}/favoriteMovies/${movieId}`, {
            method: 'PUT',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => (res.json()))
    ),
    getFavoriteMovies: (username) => (
        fetch(`${hostUrl}/appdata/${appKey}/favoriteMovies?query={"username":"${username}"}&sort={"_kmd.ect": -1}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        })
        .then(res => (res.json()))
    ),
    deteleFavoriteMovie: (movieId) => (
        fetch(`${hostUrl}/appdata/${appKey}/favoriteMovies/${movieId}?hard=true`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
        .then(res => (res.json()))
    ),
    adminDeleteMovie: (movieId) => (
        fetch(`${hostUrl}/appdata/${appKey}/movies/${movieId}?hard=true`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
        .then(res => (res.json()))
    ),
    adminDeleteComment: (commentId) => (
        fetch(`${hostUrl}/appdata/${appKey}/comments/${commentId}?hard=true`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
        .then(res => (res.json()))
    )
}
export default remote