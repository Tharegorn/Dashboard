import { verify } from "../../requests/user_requests";

function redirecter(route) {
  const sid = localStorage.getItem("session_id");
  if (sid) {
    verify(sid)
      .then((res) => {
        if (route === "/login" || route === "/register")
          window.location.replace("/");
      })
      .catch((err) => {
        localStorage.removeItem("session_id");
      });
  }
}

export { redirecter }
