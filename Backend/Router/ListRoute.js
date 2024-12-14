import express from 'express'
import VerifyToken from '../middleware/VerifyToken.js';
import { create, getListsByUser } from '../Controller/ListController.js';

const route = express.Router();

route.post('/create', create )
route.get("/:userId", getListsByUser);

export default route;