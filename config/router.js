import express from "express";
import {
  getAllWines,
  createWine,
  displayWine,
  editWine,
  deleteWine,
} from "../controllers/shoppedWine.js";
const router = express.Router();

router.route("/shoppedWine").get(getAllWines).post(createWine);

router.route("/wines/:id").get(displayWine).put(editWine).delete(deleteWine);

export default router;
