import React, { useEffect, useState } from "react";
import { getProfile } from "../../../../requests/apis_requests";
function EpitechProfile() {
  const [data, setData] = useState(null);
  useEffect(() => {
    getProfile(localStorage.getItem("session_id"))
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  return (
  <div>
    Epitech Profile
    {data ?<div>
      {data.first}
      {data.last}
      <img src={data.picture} alt="profile picture" />
      {data.gpa}
      {data.promo}{data.credits}{data.email}
    </div>: <></>}
    </div>);
}

export default EpitechProfile;
