import Wine from '../models/wine';

// get all wines
export const getAllWines = async (req, res) => {
    const wines = await Wine.find()
    return res.status(200).json(wines)
};

// get ONE wine by id
export const getOneWine = async (req, res) => {
    try {
        const { id } = req.params
        const singleWine = await Wine.findById(id)
        if (!singleWine) throw new Error()
        console.log('single wine', singleWine)
        return res.status(200).json(singleWine)
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
}

// create wine
export const createWine = async (req, res) => {
    try {
        const { body } = req.body
        console.log(body)
        const wineToAdd = await Wine.create(body)
        console.log('wine to be added', wineToAdd)
        return res.status(200).json(wineToAdd)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

// edit wine
export const editWine =  async (req, res) => {
    const { id } = req.params
    try {
      const wineToUpdate = await Wine.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })
      if (!wineToUpdate) throw new Error()
      return res.status(200).json(wineToUpdate)
    } catch (err) {
      console.log(err)
      return res.status(404).json({ 'message': 'This wine was not found!' })
    }
}

// delete wine
export const deleteWine =  async (req, res) => {
    try {
      const { id } = req.params
      const wineToDelete = await Wine.findById(id)
      if (!wineToDelete) throw new Error()

      await wineToDelete.remove()
      return res.sendStatus(200)
    } catch (err) {
      console.log(err)
      return res.status(404).json({ 'message': 'This wine was not found!' })
    }
}