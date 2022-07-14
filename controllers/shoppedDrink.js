import ShoppedDrink from "../models/shoppedDrink.js";
import Drink from "../models/drink.js";

// INDEX ROUTE - display all drinks
export const getAllShoppedDrinks = async (req, res) => {
  const drinks = await ShoppedDrink.find();
  const allDrinks = await Drink.find();

  const getAll = drinks.map((drink) => {
    const filtered = allDrinks.filter((dr) => {
      return dr.id === drink.drinkId;
    });
    if (filtered.length > 0) {
      filtered.push(drink);
      return filtered;
    }
  });
  return res.status(200).json(getAll);
};

// DRINK ROUTE (SHOW) - get one drink
export const displayShoppedDrink = async (req, res) => {
  try {
    const { id } = req.params;
    const singleDrink = await ShoppedDrink.findById(id).populate("owner");
    if (!singleDrink) throw new Error();
    console.log("single drink", singleDrink);
    return res.status(200).json(singleDrink);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Oh no! This cart was not found!" });
  }
};

// CREATE CART - to add drink to cart
export const postShoppedDrink = async (req, res) => {
  try {
    const { id } = req.params;
    const drink = await Drink.findById(id);
    if (!drink) throw new Error("No drinker found");
    // const drinkToAdd = { ...req.body, owner: req.currentUser._id }
    const drinkToAdd = { ...req.body };
    const shoppedDrink = await ShoppedDrink.create(drinkToAdd);
    console.log(shoppedDrink);
    return res.status(200).json(shoppedDrink);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: err.message });
  }
};

// DELETE ROUTE - removes a drink
export const deleteShoppedDrink = async (req, res) => {
  try {
    const { id } = req.params;
    const drinkToDelete = await ShoppedDrink.findById(id);
    if (!drinkToDelete) throw new Error();
    // if (!drinkToDelete.owner.equals(req.currentUser._id)) throw new Error('Unauthorized')
    await drinkToDelete.remove();
    return res.status(200).json("success");
  } catch (err) {
    console.log(err);
    return res
      .status(404)
      .json({ message: "Oh no! You cannot delete this cart!" });
  }
};
