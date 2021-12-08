import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { getSearch } from "../../../../requests/apis_requests";
import { LocationCity, Description, AcUnit } from "@material-ui/icons";

function YoutubeSearch() {
  const [search, setSearch] = useState(null);
  const [list, setList] = useState(null);
  return (
    <div>
      Youtube search
      <TextField
        type="Search"
        color="secondary"
        variant="outlined"
        label="Search"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            if (search !== null && search.length > 0)
              getSearch(search, localStorage.getItem("session_id")).then((res) => {
                setList(res.data.list);
              });
          }
        }}
      />
      {list ? (
        list.map((item, index) => (
          <div class="reccomendation" key={index}>
            <div class="preview">
              <img width="168" alt="thumbnail" src={item.thumbnail} />
              <div class="timestamp">1:33:48</div>
            </div>

            <div class="info">
              <div class="title">{item.title}</div>

              <div class="username">{item.channelTitle}</div>
              <div class="view-info">
                <div>views</div>
                <div>*</div>
                <div>*</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

export default YoutubeSearch;
