import express from 'express'
import { getAllWines, createWine, displayWine, editWine, deleteWine } from '../controllers/wine.js'
const router = express.Router()

router.route('/wines')
    .get(getAllWines)
    .post(createWine)

router.route('/wines/:id')
    .get(displayWine)
    .put(editWine)
    .delete(deleteWine)


export default router