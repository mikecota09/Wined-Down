import React, { useState } from "react";
import axios from "axios";
import { getTokenFromLocalStorage, getPayload } from "../helpers/auth";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SuggestedDrinkCard = ({
  id,
  drink,
  image,
  country,
  owner,
  description,
  comments,
  funFact,
  avgRating,
}) => {
  const userIsAuthenticated = () => {
    const payload = getPayload();
    if (!payload) return false;
    const now = Math.round(Date.now() / 1000);
    return now < payload.exp;
  };

  const [formData, setFormData] = useState({
    text: "",
    rating: "",
  });

  const handleChange = (event) => {
    console.log("changed");
    const suggestedDrink = {
      ...formData,
      [event.target.name]: event.target.value,
    };
    setFormData(suggestedDrink);
  };
  console.log(formData);

  const handleSubmit = async () => {
    // event.preventDefault()
    try {
      await axios.post(`/api/suggested-drinks/${id}/comments`, formData, {
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="suggested-drink" style={{ width: "40rem" }}>
      <Card.Header className="suggested-drink-header">
        <div className="tasting-room-title">
          <img src={owner.image} alt={owner.username} width={50} height={50} />
          <h3>{owner.username}</h3>
        </div>
        <div className="information">
          <h3 className="drink-name">{drink}</h3>
          <h3>{description}</h3>
          <h3>This drink originates in {country}</h3>
          <h3>{funFact}</h3>
        </div>
      </Card.Header>
      <Card.Img src={image} alt={drink} />
      <Card.Footer className="suggested-drink-footer">
        <hr />
        <div className="comments-stats">
          <h3> {comments.length} comments </h3>
          <h3> Rating: {avgRating} </h3>
        </div>
        <hr />
        <div className="comments">
          {comments.map((comment) => {
            return (
              <div className="tasting-room-comment" key={comment._id}>
                <img
                  src={comment.owner.image}
                  alt={comment.owner.username}
                  width={50}
                  height={50}
                />
                <div className="comment-user">
                  <h3 className="comment-owner">{comment.owner.username}</h3>
                  <h3>{comment.text}</h3>
                </div>
              </div>
            );
          })}
        </div>

        {userIsAuthenticated() ? (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formComment">
              <Form.Control
                type="text"
                placeholder="Write a comment... "
                name="text"
                onChange={handleChange}
                value={formData.text}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formComment">
              <Form.Control
                type="text"
                placeholder="Rating here"
                name="rating"
                onChange={handleChange}
                value={formData.rating}
              />
            </Form.Group>

            <Button
              className="comment-submit"
              variant="light"
              type="Submit"
              block
            >
              Submit
            </Button>
          </Form>
        ) : (
          <div></div>
        )}
      </Card.Footer>
    </Card>
  );
};

export default SuggestedDrinkCard;
