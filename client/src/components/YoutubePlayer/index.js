import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { stopVideoPlayer } from "../../actions/layout";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import { DragIndicator, Close } from '@material-ui/icons';
import "react-resizable/css/styles.css";

const YoutubePlayer = () => {
    const videoPlayer = useSelector(state => state.layout.videoPlayer);
    const dispatch = useDispatch();

    if (!videoPlayer.visible) {
        return null;
    }

    return (
        <Draggable handle=".handle">
            <div className="custom-youtube-player">
                <ResizableBox width={450} height={300}>
                    <div
                        onClick={() => dispatch(stopVideoPlayer())}
                    >
                        <Close/>
                    </div>
                    <div className="handle">
                        <DragIndicator/>
                    </div>
                    <iframe
                        title="Player"
                        id="player"
                        type="text/html"
                        style={{ width: "98%", height: "80%" }}
                        src={`https://www.youtube.com/embed/${videoPlayer.video}`}
                        frameborder="0"
                    ></iframe>


                    
                </ResizableBox>
            </div>
        </Draggable>
    );
};

export default YoutubePlayer;
