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
  margin-bottom: 10%;
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
  flex-basis: 80%;
  position: relative;
    box-shadow: 5px 5px 10px #bfbebe, -5px -5px 2px #bfbebe, 5px -5px 2px #bfbebe,
    -5px 5px 2px #bfbebe;
  display: flex;
  padding: 5px;
  align-items: center;
  
`;
const DivComment = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
`;
const ControllerButton = styled.div`
  margin-top: 10px;
  margin-bottom: 50px;
   margin-left: 20%;
   display: flex;
   gap: 10px;
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
  }, [ deleteData]);

  console.log(commentsList);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  console.log("hello :" + idPro);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    if (comment.length > 200) {
      toast.error("Please comment less than 200 characters");
    } else {
      const newComment = {
        productId: idPro,
        star: rating,
        review: comment,
      };
      await addComment(newComment, setAddData, toast);
      setComment("");
      await viewComment(idPro, setCommentsList);
    }
  };
  
  const handleCancel = () => {
    setComment("");
  };

 
  
  const handleUpdateComment = async (id) => {
    setUpdateComment(commentsList?.find((comment) => comment._id === id));
    handleShow();
  };


  const [updateState,setUpdateState] = useState()
  const [updateStar,setUpdateStar] = useState()

  const handleUpdateCommentChange = (event) => {
    setUpdateState(event.target.value);
  };

  const handleUpdateRatingChange = (newRating) => {
    setUpdateStar(newRating);
  };

  const handleDeleteComment = async (id) => {
    if (confirm("Are you sure you want to delete ?")) {
      await deleteComment(id, setDeleteData, toast);
      await viewComment(idPro, setCommentsList);
    }
  };

  const handleAccessUpdate = async () => {
    // console.log(updateComment);

    const reviewData = updateCommentRef.current.value;

    const data = {
      star: updateStar,
      review: updateState,
    };
    if (comment.length > 200) {
      toast.error("Please comment less than 200 characters");
    } else {
    if (updateStar > 0 && updateState !== "") {
      await updateCommentAPI(updateComment?._id, setUpdateData, data, toast);
      handleClose();
      await viewComment(idPro, setCommentsList);
    } else {
      toast?.error("Please input a complete update for the comment.");
    }}
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
            <div  style={{marginBottom:'5%'}}>
            <div style={{display:'flex',alignContent:'center',justifyContent:'space-evenly'}}> 
            <div style={{marginTop:'auto',marginBottom:'auto'}}>
            <img
            src={item?.user?.userAvatar}
            width="100"
            height="100"
            style={{
              borderRadius: "50%",
            }}
          />
          </div>
            <Showcomment key={index}>
             

              <DivComment>
              <p>
                  <span style={{ fontWeight: "bolder" , fontSize:'20px' }}>{item?.user?.userName}</span>
                </p>
                <p>
                  
                  <Star number={item?.star} />
                </p>
                <p>
                  {item?.review}
                </p>
                <p style={{position:'absolute',top:'8%', right:'2%'}}>
                  {item?.createdAt
                    ? new Date(item.createdAt).toLocaleString("en-US")
                    : ""}
                </p>
              </DivComment>
              
            </Showcomment>
            </div>
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
            </div>
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
                  onChange={handleUpdateCommentChange}
                  ref={updateCommentRef}
                ></Textarea>
              </div>
              <div>
                <h4>Star Rating:</h4>
                <StarRating
                  defaultNumber={updateComment?.star}
                  value={updateStar}
                  onChange={handleUpdateRatingChange}
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
