import express from "express";
import {
  getAllShoppedWines,
  postShoppedWine,
  displayShoppedWine,
  deleteShoppedWine,
} from "../controllers/shoppedWine.js";
const router = express.Router();

router.route("/shopped-wines").get(getAllShoppedWines);

router.route("/shopped-wines/:id").get(displayShoppedWine).delete(deleteShoppedWine).post(postShoppedWine);

export default router;
