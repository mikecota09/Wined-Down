import mongoose from 'mongoose'
import { databaseURI } from '../config/environment.js'
import Wine from '../models/wine.js'
import wineData from './data/Wines.js'
import User from '../models/User.js'
import userData from './data/Users.js'
import ShoppedWine from '../models/shoppedwine.js'
import shoppedWineData from './data/ShoppedWine.js'





const seedDatabase = async () => {
  try {
    // connect to db 
    await mongoose.connect(databaseURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    console.log('🚀 DB connected in seeds')

    // drop the db
    await mongoose.connection.db.dropDatabase()
    console.log('👍🏽 DB dropped')

    // create users
    const users = await User.create(userData)
    console.log(users)

    // create wineData with added ownwer field 
    const winesWithAddedUsers = wineData.map(wine => {
      return { ...wine, owner: users[0]._id }
    })
    console.log(users.length)

    // create wines using wineData
    const wines = await Wine.create(winesWithAddedUsers)
    console.log(`🌱 DB seeded with ${wines.length} wines`)

    // create shoppedWineData with added ownwer field 
    const shoppedWinesWithData = shoppedWineData.map(wine => {
      return { ...wine, owner: users[0]._id }
    })

    // create shoppedWines
    const shoppedWines = await ShoppedWine.create(shoppedWinesWithData)
    // console.log(`🌱 DB seeded with ${shoppedWines.length} wines`)

    
    

    // closing the connection 
    await mongoose.connection.close()
    console.log('✌🏽 bye')

  } catch (err) {
    console.log('Error:', err)
    console.log('🆘 something has gone wrong')
    await mongoose.connection.close()
  }
}

seedDatabase()