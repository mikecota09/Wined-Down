import express from 'express'
import { getAllWines, createWine, displayWine, editWine, deleteWine } from '../controllers/wine.js'
import { getAllUsers, getUser, createUser, deleteUser, editUser } from '../controllers/users.js'
const router = express.Router()

router.route('/wines')
    .get(getAllWines)
    .post(createWine)

router.route('/wines/:id')
    .get(displayWine)
    .put(editWine)
    .delete(deleteWine)

router.route('/users')
    .get(getAllUsers)
    .post(createUser)

router.route('/users/:id')
    .get(getUser)
    .put(editUser)
    .delete(deleteUser)

export default router