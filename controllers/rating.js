import { Next } from 'react-bootstrap/esm/PageItem';
import Ratings from '../models/ratings';

// get all ratings
export const getAllRatings = async (req, res) => {
    try 
    {
        const ratings = await ratings.find()
        res.status(200).json({ ratings })
    } catch (error) 
    {
        return next(error)
    }
}