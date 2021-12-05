import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { startVideoPlayer } from "../../../../actions/layout";

function YoutubePlayer() {
  const dispatch = useDispatch();

  const [video, setVideo] = useState(null);
  return (
    <div>
      Youtube Player
      <TextField
        onChange={(e) => setVideo(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            if (
              video !== null &&
              video.length > 0 &&
              video.includes("https://www.youtube.com/watch?v=")
            ) {
              dispatch(
                startVideoPlayer(
                  video.replace("https://www.youtube.com/watch?v=", "")
                )
              );
            }
          }
        }}
      />
    </div>
  );
}

export default YoutubePlayer;
