import Drink from "../models/drink.js";

// INDEX ROUTE - display all drinks
export const getAllDrinks = async (_req, res) => {
  const drinks = await Drink.find();
  return res.status(200).json(drinks);
};

// CREATE ROUTE - create a drink
export const createDrink = async (req, res) => {
  try {
    const drinkWithOwner = { ...req.body, owner: req.currentUser._id };
    console.log(drinkWithOwner);
    const drinkToAdd = await Drink.create(drinkWithOwner);
    console.log("DRINK TO ADD", drinkToAdd);
    return res.status(201).json(drinkToAdd);
  } catch (err) {
    console.log(err);
    return res.status(422).json(err);
  }
};

// DRINK ROUTE (SHOW) - get one drink
export const displayDrink = async (req, res) => {
  try {
    const { id } = req.params;
    const singleDrink = await Drink.findById(id)
      .populate("owner")
      .populate("comments.owner");
    if (!singleDrink) throw new Error();
    console.log("single drink", singleDrink);
    return res.status(200).json(singleDrink);
  } catch (err) {
    console.log(err);
    return res
      .status(404)
      .json({ message: "Oh no! This drink was not found!" });
  }
};

// DELETE ROUTE - removes a drink
export const deleteDrink = async (req, res) => {
  try {
    const { id } = req.params;
    const drinkToDelete = await Drink.findById(id);
    if (!drinkToDelete) throw new Error();
    //check
    if (!drinkToDelete.owner.equals(req.currentUser._id))
      throw new Error("Unauthorized");
    await drinkToDelete.remove();
    //await Drink.findByIdAndDelete({ _id: id })
    return res.sendStatus(204);
  } catch (err) {
    console.log(err);
    return res
      .status(404)
      .json({ message: "Oh no! This drink was not found!" });
  }
};

// EDIT ROUTE - edits a drink
export const editDrink = async (req, res) => {
  const { id } = req.params;
  try {
    const drinkToUpdate = await Drink.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    if (!drinkToUpdate) throw new Error();
    return res.status(200).json(drinkToUpdate);
  } catch (err) {
    console.log(err);
    return res
      .status(404)
      .json({ message: "Oh no! This drink was not found!" });
  }
};

// Create comment
export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const drink = await Drink.findById(id);
    if (!drink) throw new Error("No drink found");
    const commentToAdd = { ...req.body, owner: req.currentUser._id };
    console.log(commentToAdd);
    drink.comments.push(commentToAdd);
    await drink.save();
    return res.status(200).json(drink);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: err.message });
  }
};

// Delete comment
export const deleteComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const drink = await Drink.findById(id);
    if (!drink) throw new Error("no drink found");
    const commentToDelete = drink.comments.id(commentId);
    if (!commentToDelete) throw new Error("Comment not found");
    await commentToDelete.remove();
    await drink.save();
    return res.sendStatus(204);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Something went wrong" });
  }
};
