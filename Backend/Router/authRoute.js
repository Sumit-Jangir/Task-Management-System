import express from 'express'
import {login, signUp} from '../Controller/userController.js'
import VerifyToken from '../middleware/VerifyToken.js';

const route = express.Router();

route.post('/signup', signUp)
route.post('/login',login)

export default route;