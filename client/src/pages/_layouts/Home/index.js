import React from "react";
import { withRouter } from "react-router-dom";
import YouTubePlayer from "../../../components/YoutubePlayer"


const Home = () => {
    return (<>
    <div className="wrapper">
        <YouTubePlayer />
    </div>
    </>)
}

export default withRouter(Home)