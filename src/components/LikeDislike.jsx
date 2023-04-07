import React from "react";
import "../App.css";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

import { createTheme } from "@mui/material/styles";

const theme = createTheme();

function LikeDislike(props) {
  const { like, handleLike, handleDislike, likedId } = props;
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (likedId && likedId.includes(localStorage.getItem("user_id"))) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [likedId]);

  const handleClick = () => {
    
    if (isLiked) {
      setIsLiked(false);
      handleDislike();
    } else {
      setIsLiked(true);
      handleLike();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ textAlign: "right" }}>
        <IconButton
          aria-label="like"
          onClick={handleClick}
          style={{ color: isLiked ? "#58fb58" : "black" }}
        >
          {isLiked ? (
            <SentimentVerySatisfiedIcon fontSize="large" />
          ) : (
            <SentimentSatisfiedIcon fontSize="large" />
          )}
        </IconButton>
        <span>{like} endorsements</span>
      </div>
    </ThemeProvider>
  );
}

export default LikeDislike;

