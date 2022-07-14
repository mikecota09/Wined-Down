import express from "express";
import {
  getAllShoppedWines,
  postShoppedWine,
  displayShoppedWine,
  deleteShoppedWine,
} from "../controllers/shoppedWine.js";
import {
  getAllWines,
  getOneWine,
  createWine,
  editWine,
  deleteWine
} from '../controllers/wine.js'

import {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  editUser
} from '../controllers/users.js'

import {
  registerUser,
  loginUser
} from '../controllers/auth.js';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/wines').get(getAllWines).post(createWine);
router.route('/wines/:id').get(getOneWine).put(editWine).delete(deleteWine);

router.route("/shopped-wines").get(getAllShoppedWines);

router.route("/shopped-wines/:id").get(displayShoppedWine).delete(deleteShoppedWine).post(postShoppedWine);
router.route('/profile').get(getAllUsers).post(createUser);
router.route('/profile/:id').get(getUser).put(editUser).delete(deleteUser);
export default router;
