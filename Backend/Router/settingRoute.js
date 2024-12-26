import express from 'express'
import { createAddUpdateNavList, getNavList } from '../Controller/settingController.js';

const route = express.Router();

route.post('/createAndUpdate', createAddUpdateNavList )
route.post('/getNavList', getNavList )

export default route;   