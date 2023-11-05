import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import img from "../../assets/avatar.jpg";
import StarRating from "../products/Starrating"; // Corrected import
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import Star from "../../components/Star.jsx";
import {
  addComment,
  viewComment,
  updateCommentAPI,
  deleteComment,
} from "../../services/connectApi.js";
import { useSelector } from "react-redux";
const Controller = styled.div``;
const Control = styled.div`
  display: flex;
`;
const Avatar = styled.div`
  flex-basis: 15%;
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
  position: relative;
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
const ControllerButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  gap: 20px;
`;
const ButtonUpdate = styled.button`
  border: none;
  background-color: green;
  color: white;
  &:hover {
    background-color: #5fed5f;
  }
`;
const ButtonDelete = styled.button`
  border: none;
  background-color: red;
  color: white;
  &:hover {
    background-color: #f68080;
  }
`;
const ControlUpdate = styled.div`
  margin-top: 20px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 50px;
`;
const ButtonClose = styled.button`
  border: none;
  background-color: red;
  padding: 10px;
  color: white;
  border-radius: 10%;
  &:hover {
    background-color: #f56868;
  }
`;
const ButtonUpdateCom = styled.button`
  border: none;
  background-color: blue;
  border-radius: 10%;
  color: white;
  padding: 10px;
  &:hover {
    background-color: #7979f3;
  }
`;
const View = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;
const ViewMore = styled.button`
  border: none;
  padding: 10px;
  border-radius: 5px;
  background-color: green;
  color: white;
  &:hover {
    background-color: #6eeb6e;
  }
`;
const ViewLess = styled.button`
  border: none;
  padding: 10px;
  border-radius: 5px;
  background-color: blue;
  color: white;
  &:hover {
    background-color: #6565f0;
  }
`;
const ModalController = styled.div``;
const Comment = (props) => {
  const { idPro } = props;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState();
  const user = useSelector((state) => state?.loginController);
  const [show, setShow] = useState(false);
  const [updateComment, setUpdateComment] = useState();
  const [addData, setAddData] = useState();
  const [deleteData, setDeleteData] = useState();
  const [updateData, setUpdateData] = useState();
  const updateCommentRef = useRef();
  const [view, setView] = useState(3);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    const getDataComment = async () => {
      await viewComment(idPro, setCommentsList);
    };
    getDataComment();
  }, [addData, deleteData]);

  console.log(commentsList);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  console.log("hello :" + idPro);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    const newComment = {
      productId: idPro,
      star: rating,
      review: comment,
    };
    await addComment(newComment, setAddData, toast);
    setComment("");
  };

  const handleCancel = () => {
    setComment("");
  };

  const handleUpdateComment = async (id) => {
    setUpdateComment(commentsList?.find((comment) => comment._id === id));
    handleShow();
  };

  const handleDeleteComment = async (id) => {
    if (confirm("Are you sure you want to delete ?")) {
      await deleteComment(id, setDeleteData, toast);
    }
  };

  const handleAccessUpdate = async () => {
    // console.log(updateComment);

    const reviewData = updateCommentRef.current.value;

    const data = {
      star: rating,
      review: reviewData,
    };

    if (rating > 0 && reviewData !== "") {
      await updateCommentAPI(updateComment?._id, setUpdateData, data, toast);
      handleClose();
      await viewComment(idPro, setCommentsList);
    } else {
      toast?.error("Please input a complete update for the comment.");
    }
  };

  return (
    <Controller>
      {user?.value && (
        <Control>
          <Avatar>
            <Img
              src={user?.value?.userAvatar}
              width="100"
              height="100"
              style={{
                borderRadius: "50%",
              }}
            />
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
      )}
      <div>
        {commentsList &&
          commentsList?.slice(0, view)?.map((item, index) => (
            <Showcomment key={index}>
              <img
                src={item?.user?.userAvatar}
                width="80"
                height="80"
                style={{
                  borderRadius: "50%",
                }}
              />

              <DivComment>
                <p>
                  <span style={{ fontWeight: "bolder" }}>Rating</span>:{" "}
                  <Star number={item?.star} />
                </p>
                <p>
                  <span style={{ fontWeight: "bolder" }}>Comment</span>:{" "}
                  {item?.review}
                </p>
                <p>
                  <span style={{ fontWeight: "bolder" }}>Time:</span>
                  {item?.createdAt
                    ? new Date(item.createdAt).toLocaleString("en-US")
                    : ""}
                </p>
              </DivComment>
              {user?.value?._id === item?.user?._id && (
                <ControllerButton>
                  <ButtonUpdate>
                    <div>
                      <EditIcon
                        onClick={(e) => {
                          handleUpdateComment(item?._id);
                        }}
                      />
                    </div>
                  </ButtonUpdate>
                  <ButtonDelete>
                    <div>
                      <DeleteIcon
                        onClick={(e) => {
                          handleDeleteComment(item?._id);
                        }}
                      />
                    </div>
                  </ButtonDelete>
                </ControllerButton>
              )}
            </Showcomment>
          ))}
        <ModalController>
          <Modal show={show} onHide={handleClose}>
            <div style={{ textAlign: "center" }}>
              <h2>Update comment</h2>
            </div>
            <ControlUpdate>
              <div>
                <h4>Comment:</h4>
                <Textarea
                  rows="4"
                  cols="50"
                  defaultValue={updateComment?.review}
                  onChange={handleCommentChange}
                  ref={updateCommentRef}
                ></Textarea>
              </div>
              <div>
                <h4>Star Rating:</h4>
                <StarRating
                  defaultNumber={updateComment?.star}
                  value={rating}
                  onChange={handleRatingChange}
                />
              </div>
            </ControlUpdate>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "50%",
                marginBottom: "20px",
              }}
            >
              <ButtonClose onClick={handleClose}>Close</ButtonClose>
              <ButtonUpdateCom onClick={handleAccessUpdate}>
                Update
              </ButtonUpdateCom>
            </div>
          </Modal>
        </ModalController>
        <View>
          {view < commentsList?.length && (
            <ViewMore
              onClick={() => {
                setView(view + 3);
              }}
            >
              View more
            </ViewMore>
          )}
          {view > 3 && (
            <ViewLess
              onClick={() => {
                setView(view - 3);
              }}
            >
              View less
            </ViewLess>
          )}
        </View>
      </div>
    </Controller>
  );
};

export default Comment;
