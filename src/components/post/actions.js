import { useState, useContext } from "react";
import PropTypes from "prop-types";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";

const Actions = ({ docId, totalLikes, likedPhoto, handleFocus }) => {
  const {
    user: { uid: userId = "" },
  } = useContext(UserContext);

  const [toggleLiked, setToggleLiked] = useState(likedPhoto);
  const [liked, setLiked] = useState(totalLikes);
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const handleToggleLiked = async () => {
    setToggleLiked((toggleLiked) => !toggleLiked);
  };

  return <div>Actions</div>;
};

export default Actions;