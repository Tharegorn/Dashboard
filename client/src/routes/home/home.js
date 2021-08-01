import React from "react";
import Button from "@material-ui/core/Button";

export default function Home() {
  return <div>
      <Button variant="contained" color="primary" href="/register">
  Register
</Button>
<Button variant="contained" color="primary" href="/login">
  Login
</Button>
  </div>;
}
