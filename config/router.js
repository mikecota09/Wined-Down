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

const router = express.Router();

router.route('/wines').get(getAllWines).post(createWine);
router.route('/wines/:id').get(getOneWine).put(editWine).delete(deleteWine);

router.route("/shopped-wines").get(getAllShoppedWines);

router.route("/shopped-wines/:id").get(displayShoppedWine).delete(deleteShoppedWine).post(postShoppedWine);

export default router;
