import React, { useState } from "react";
import styled from "styled-components";
import img from "../../assets/avatar.jpg";
import StarRating from "../products/Starrating"; // Corrected import
import StarIcon from "@mui/icons-material/Star";
const Controller = styled.div``;
const Control = styled.div`
  display: flex;
`;
const Avatar = styled.div`
  flex-basis: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Img = styled.img`
  border-radius: 50%;
  width: 50%;
`;
const CommentControl = styled.div`
  flex-basis: 90%;
  display: flex;
  flex-direction: column;
`;
const Textarea = styled.textarea``;
const ButtonComment = styled.div`
  margin-top: 1%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ButtonOne = styled.button`
  border: none;
  background-color: #ef4343;
  color: white;
  padding: 10px;
`;
const ButtonTwo = styled.button`
  border: none;
  background-color: #389538;
  color: white;
  padding: 10px;
`;

const Showcomment = styled.div`
  margin-top: 2%;
  margin-bottom: 2%;
  padding: 20px;
  box-shadow: 5px 5px 10px #bfbebe, -5px -5px 2px #bfbebe, 5px -5px 2px #bfbebe,
    -5px 5px 2px #bfbebe;
  display: flex;
  align-items: center;
  gap: 2%;
`;
const DivComment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
`;
const Comment = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    const newComment = {
      rating,
      comment,
    };
    setCommentsList([...commentsList, newComment]);
    setRating(0);
    setComment("");
  };

  const handleCancel = () => {
    // Clear the comment input and selected rating
    setComment("");
  };

  return (
    <Controller>
      <Control>
        <Avatar>
          <Img src={img} />
        </Avatar>
        <CommentControl>
          <StarRating value={rating} onChange={handleRatingChange} />
          <Textarea
            rows="4"
            cols="50"
            value={comment}
            onChange={handleCommentChange}
          ></Textarea>
          <ButtonComment>
            <ButtonOne onClick={handleCancel}>Cancel</ButtonOne>
            <ButtonTwo onClick={handleSubmit}>Send</ButtonTwo>
          </ButtonComment>
        </CommentControl>
      </Control>
      <div>
        {commentsList.map((item, index) => (
          <Showcomment key={index}>
            <img
              src={img}
              width="10%"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
            <DivComment>
              <p>
                <span style={{ fontWeight: "bolder" }}>Rating</span>:{" "}
                {item.rating}&nbsp;
                <StarIcon />
              </p>
              <p>
                <span style={{ fontWeight: "bolder" }}>Comment</span>:{" "}
                {item.comment}
              </p>
            </DivComment>
          </Showcomment>
        ))}
      </div>
    </Controller>
  );
};

export default Comment;
