import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import "react-resizable/css/styles.css";
import EpitechProfile from "../../components/Widgets/Epitech/Profile";
import EpitechPlanning from "../../components/Widgets/Epitech/Planning";
import CurrencyExchange from "../../components/Widgets/Currency/Exchange";
import WeatherCity from "../../components/Widgets/Weather/City";
import YoutubeChannel from "../../components/Widgets/Youtube/Channel";
import YoutubeSearch from "../../components/Widgets/Youtube/Search";
import YoutubePlayer from "../../components/Widgets/Youtube/Player";
import "./index.css";
function Widget(props) {
  const [widget, setWidget] = useState(null);
  useEffect(() => {
    if (props.type === "epitech_profile") setWidget(<EpitechProfile />);
    if (props.type === "epitech_planning") setWidget(<EpitechPlanning />);
    if (props.type === "city_weather") setWidget(<WeatherCity />);
    if (props.type === "channel_stats") setWidget(<YoutubeChannel />);
    if (props.type === "youtube_search") setWidget(<YoutubeSearch />);
    if (props.type === "currency_converter") setWidget(<CurrencyExchange />);
    if (props.type === "youtube_player") setWidget(<YoutubePlayer />);
  }, []);
  return (
    <Draggable handle=".handle">
      <div className="handle" title="Drag Me">
        <div class="card">
          <div class="row">
            <div class="column left">
              <span
                class="dot"
                onClick={() =>
                  document.getElementById("" + props.id + "").remove()
                }
              ></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
            <div class="column middle">
              <div class="windowtitle">https://{props.type}</div>
            </div>
          </div>

          <div class="content">
            {widget}
            {/* {/* <h3>Browser Window</h3 */}
            {/* <p>How to create a detailed browser window look with CSS.</p> */}
          </div>
        </div>
      </div>
    </Draggable>
  );
}

export default Widget;
