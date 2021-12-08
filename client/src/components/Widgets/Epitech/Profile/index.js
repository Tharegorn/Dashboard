import React, { useEffect, useState } from "react";
import { getProfile } from "../../../../requests/apis_requests";
function EpitechProfile() {
  const [data, setData] = useState(null);
  useEffect(() => {
    getProfile(localStorage.getItem("session_id"))
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);
  return (
    <div>
      Epitech Profile
      {data ? (
        <div>
          <img src={data.picture} alt={data.first + " " + data.last} /><br/>
          {data.first} {data.last}<br/>
          GPA : {data.gpa} | Credits: {data.credits} <br/>
          Promo {data.promo}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default EpitechProfile;
