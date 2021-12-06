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
          {data.first}
          {data.last}
          <img src={data.picture} alt={data.first + " " + data.last} />
          {data.gpa}
          {data.promo}
          {data.credits}
          {data.email}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default EpitechProfile;
