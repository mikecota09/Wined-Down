import User from '../models/User.js';

// get all users
export const getAllUsers = async (req, res) => {
    const users = await User.find()
    return res.status(200).json(users)
}

// get one user
export const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const oneUser = await User.findById(id)
        if (!oneUser) throw new Error()
        console.log('single user', oneUser)
        return res.status(200).json(oneUser)
    } catch (err) {
        console.log(err)
        return res.status(404).json({ message: 'User not found' })
    }
}

// create user
export const createUser = async (req, res) => {
    try {
        const userToBeAdded = await User.create(req.body)
        console.log('USER TO BE ADDED', userToBeAdded)
        return res.status(200).json(userToBeAdded)
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
}

// delete user
export const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        await User.findByIdAndDelete({ _id: id })
        return res.sendStatus(200)
    } catch (err) {
        console.log(err)
        return res.status(400).json({ message: 'User not found' })
    }
}

// edit user
export const editUser = async (req, res) => {
    const { id } = req.params
    try {
        const userToBeUpdated = await User.findOneAndUpdate({ _id: id }, { ... req.body }, { new: true })
        if(!userToBeUpdated) throw new Error()
        return res.status(200).json(userToBeUpdated)
    } catch (err) {
        console.log(err)
        return res.status(400).json({ message: 'User not found' })
    }
}