import Wine from "../models/wine.js";

// get all wines
export const getAllWines = async (_req, res) => {
  const wines = await Wine.find();
  return res.status(200).json(wines);
};

// create a wine
export const createWine = async (req, res) => {
  try {
    const wineToBeAdded = await Wine.create(req.body);
    console.log("WINE TO ADD", wineToBeAdded);
    return res.status(201).json(wineToBeAdded);
  } catch (err) {
    console.log(err);
    return res.status(422).json(err);
  }
};

// get one wine
export const displayWine = async (req, res) => {
  try {
    const { id } = req.params;
    const oneWine = await Wine.findById(id);
    if (!oneWine) throw new Error();
    console.log("single wine", oneWine);
    return res.status(200).json(oneWine);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Wine not exist" });
  }
};

// remove a wine
export const deleteWine = async (req, res) => {
  const { id } = req.params;
  try {
    await Wine.findByIdAndDelete({ _id: id });
    return res.sendStatus(204);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Wine not exist" });
  }
};

// edit a wine
export const editWine = async (req, res) => {
  const { id } = req.params;
  try {
    const wineToBeUpdated = await Wine.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    if (!wineToBeUpdated) throw new Error();
    return res.status(200).json(wineToBeUpdated);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Wine not exist" });
  }
};
