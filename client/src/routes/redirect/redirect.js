import { verify } from "../../requests/user_requests";

function redirecter(route) {
  const sid = localStorage.getItem("session_id");
    console.log("bite")
  if (sid) {
      console.log("salut")
    verify(sid)
      .then((res) => {
        console.log(res)
        if (route === "/login" || route === "/register")
          window.location.replace("/");
      })
      .catch((err) => {
          console.log(err)
        localStorage.removeItem("session_id");
      });
  }
}

export { redirecter }
