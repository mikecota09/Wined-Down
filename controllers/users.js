import User from "../models/user.js";

//Creating controller function that returns profile information
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.currentUser._id).populate(
      "createdDrinks"
    );
    if (!user) throw new Error();
    console.log("USER->", user);
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Not found" });
  }
};
// Now we do reverse relationship
