import express from 'express'
import {showUser, showUserById, createUser, login } from '../controllers/user.js'

const router = express.Router();

router.get('/user', showUser);

router.get('/user/:id', showUserById);

router.post('/create-user', createUser);

router.post('/login', login);

export default router;