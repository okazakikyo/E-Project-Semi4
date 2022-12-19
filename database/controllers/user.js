import { getUser, getUserById, insertUser, checkLogin } from '../models/UserModel.js'

export const showUser = (req, res) => {
    getUser((err, result) => {
        if(err) {
            res.send(err)
        } else {
            res.json(result)
        }
    })
}

export const showUserById = (req, res) => {
    getUserById(req.params.id, (err, result) => {
        if(err) {
            res.send(err)
        } else {
            res.json(result)
        }
    })
}

export const createUser = (req, res) => {
    const data = req.body
    insertUser(data, (err, result) => {
        if(err) {
            res.send(err)
        } else {
            res.json(result)
        }
    })
}

export const login = (req, res) => {
    checkLogin(req.params.username, req.params.password, (err, result) => {
        if(err) {
            res.send(err)
        } else {
            res.json(result)
        }
    })
}