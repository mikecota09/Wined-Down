import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { ImageUploadField } from './ImageUploadField'


const SuggestDrinkForm = ({ handleSubmit, handleChange, formData, handleImageUrl }) => {

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicDrink">
        <Form.Control 
          type="text" 
          placeholder="Drink name" 
          name="drink" 
          onChange={handleChange}
          value={formData.drink}
        />
      </Form.Group>

      <Form.Group>
        {/* <Form.Label>Select drink type</Form.Label> */}
        <Form.Control 
          as="select" 
          value={formData.type} 
          name="type" 
          onChange={handleChange}>
          <option>- Please select a type of drink -</option>
          <option>Tea</option>
          <option>Coffee</option>
        </Form.Control>
      </Form.Group>
      <br />

      <Form.Group className="mb-3" controlId="formBasicCountry">
        <Form.Control 
          type="text" 
          placeholder="Which country is your drink from?" 
          name="country" 
          onChange={handleChange}
          value={formData.country}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="fromBasicDescription">
        <Form.Control 
          as="textarea"
          rows={3}
          placeholder="Drink description" 
          name="description" 
          onChange={handleChange}
          value={formData.description}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicFunFact">
        <Form.Control 
          as="textarea"
          rows={3}
          placeholder="Any fun facts you'd like to share!" 
          name="funFact" 
          onChange={handleChange}
          value={formData.funFact}
        /> 
      </Form.Group>

      <br />

      <ImageUploadField 
        value={formData.image}
        name="image"
        handleImageUrl={handleImageUrl}
      />

      <Button variant="warning" type="Submit" block>Submit</Button>

    </Form>
  )
}

export default SuggestDrinkForm