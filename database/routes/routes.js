import express from 'express'
import {showUser, showUserById, createUser } from '../controllers/user.js'

const router = express.Router();

router.get('/user', showUser);

router.get('/user/:id', showUserById);

router.post('/create-user', createUser);

export default router;