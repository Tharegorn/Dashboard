import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { startVideoPlayer } from "../../../../actions/layout";
import { getChannel } from "../../../../requests/apis_requests"
import { Visibility, OndemandVideo, PersonAdd } from '@material-ui/icons'

function YoutubeChannel() {
  const dispatch = useDispatch();
  const [channel, setChannel] = useState(null);
  const [stats, setStats] = useState(null);

  return (
    <div>
      <div>Channel Stats</div>
      <TextField
        type="channel"
        color="secondary"
        variant="outlined"
        label="Channel"
        onChange={(e) => {
          setChannel(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            if (channel !== null && channel.length > 0)
              getChannel(channel, localStorage.getItem("session_id")).then((res) => {
                setStats({ id: res.data.id, name: res.data.name, subs: res.data.subs, thumbnail: res.data.thumbnail, url: res.data.url, vids: res.data.vids, views: res.data.views, video: res.data.video })
              }).catch((err) => {
                throw err
              })
          }
        }}
      />
      {stats ? <div>
        <img src={stats.thumbnail} alt={stats.name} />
        <h1><a href={"https://youtube.com/channel/" + stats.id} rel="noreferrer" target="_blank">{stats.name}</a></h1>
        <p><Visibility /> : {stats.views}</p>
        <p><PersonAdd /> : {stats.subs}</p>
        <p><OndemandVideo /> : {stats.vids}</p>
        {stats.video !== null ? <div onClick={() => dispatch(startVideoPlayer(stats.video))}>Watch Video</div> : <p>Any last video</p>}
      </div> : <></>}
    </div>)
}

export default YoutubeChannel;
