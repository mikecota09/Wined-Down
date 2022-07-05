import ShoppedWine from '../models/shoppedWine.js'
import Wine from "../models/wine.js";

// display all wines - index
export const getAllShoppedWines = async (req, res) => {
  const wines = await ShoppedWine.find()
  const allWines = await Wine.find()

  const getAll = wines.map(wine => {
    const filtered = allWines.filter(wn => {
      return wn.id === wine.wineId
    })
    if (filtered.length > 0) {
      filtered.push(wine)
      return filtered
    }
  })
  return res.status(200).json(getAll)
}

// get one wine - wine route
export const displayShoppedWine = async (req, res) => {
  try {
    const { id } = req.params
    const singleWine = await ShoppedWine.findById(id).populate('owner')
    if (!singleWine) throw new Error()
    console.log('single wine', singleWine)
    return res.status(200).json(singleWine)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ 'message': 'An error occurs while getting a wine' })
  }
}

// add a wine to cart 
export const postShoppedWine = async (req, res) => {
  try {
    const { id } = req.params
    const wine = await Wine.findById(id)
    if (!wine) throw new Error('No wine found')
    const wineToBeAdded = { ...req.body }
    const shoppedWine = await ShoppedWine.create(wineToBeAdded)
    console.log(shoppedWine)
    return res.status(200).json(shoppedWine)
  } catch (err) {
    console.log(err) 
    return res.status(404).json({ message: err.message })
  }
}

// delete a shopped wine
export const deleteShoppedWine =  async (req, res) => {
  try {
    const { id } = req.params
    const wineToBeDeleted = await ShoppedWine.findById(id)
    if (!wineToBeDeleted) throw new Error()
    await wineToBeDeleted.remove()
    return res.status(200).json('success')
  } catch (err) {
    console.log(err)
    return res.status(404).json({ 'message': 'An error occurs while deleting a wine' })
  }
}