// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, maxLength: 30, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: false }
})

// Reverse relationship that shows all wines related to current user
userSchema.virtual('createdWines', {
  ref: 'Wine', // references the Wine model
  localField: '_id',
  foreignField: 'owner'
})

// remove password 
userSchema.set('toJSON', {
  virtuals: true,
  transform(_doc, json) {
    delete json.password
    return json
  }
})

// Virtual field 
userSchema 
  .virtual('passwordConfirmation')
  .set(function(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation 
  })

// Custom pre validattion 
userSchema
  .pre('validate', function(next){
    if (this.isModified('password') && this.password !== this._passwordConfirmation){
      // Invalidate the request
      this.invalidate('passwordConfirmation', 'Passwords do not match')
    }
    next()
  })

// Custom pre save
userSchema
  .pre('save', function(next){
    if (this.isModified('password')){
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    }
    next()
  })

// Creating a method that checks user inputted password against hashed password in db
userSchema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password, this.password)
}



// Export the model 
export default mongoose.model('User', userSchema)