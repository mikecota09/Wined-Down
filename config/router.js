<<<<<<< HEAD
import express from "express";
import {
  getAllWines,
  createWine,
  displayWine,
  editWine,
  deleteWine,
} from "../controllers/shoppedWine.js";
const router = express.Router();
=======
import express from 'express'
import { getAllWines, createWine, displayWine, editWine, deleteWine } from '../controllers/wine.js'
import { getAllUsers, getUser, createUser, deleteUser, editUser } from '../controllers/users.js'
const router = express.Router()
>>>>>>> b0db4893fb5bfc28fbcc65218bf554a2461841a5

router.route("/shoppedWine").get(getAllWines).post(createWine);

router.route("/wines/:id").get(displayWine).put(editWine).delete(deleteWine);

<<<<<<< HEAD
export default router;
=======
router.route('/users')
    .get(getAllUsers)
    .post(createUser)

router.route('/users/:id')
    .get(getUser)
    .put(editUser)
    .delete(deleteUser)

export default router
>>>>>>> b0db4893fb5bfc28fbcc65218bf554a2461841a5
