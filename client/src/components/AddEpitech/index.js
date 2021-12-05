import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { set_autologin } from "../../requests/user_requests";

function AddEpitech(props) {
  const [inputs, setInputs] = useState(null);
  return (
    <>
      <Dialog open={props.onClose}>
        <DialogTitle>Linked you'r Epitech Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To link it go at this{" "}
            <a
              href="https://intra.epitech.eu/admin/autolog"
              target="_blank"
              rel="noreferrer"
            >
              page
            </a>{" "}
            and copy the link (only from auth part)
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="AutoLogin"
            label="AutoLogin"
            type="name"
            fullWidth
            variant="standard"
            onChange={(e) => setInputs(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.setClose(false);
            }}
          >
            Abort
          </Button>
          <Button
            onClick={() => {
              set_autologin(inputs, localStorage.getItem("session_id"));
              props.setClose(false);
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddEpitech;
