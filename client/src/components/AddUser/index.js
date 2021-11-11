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
import { createUser } from "../../requests/user_requests";
import Modal from "react-bootstrap/Modal";

const AddUser = ({ onClose }) => {
  const [inputs, setInputs] = useState({ name: "", password: "" });
  console.log(onClose)
  return (
    <>
      <Dialog open={onClose} >
        <DialogTitle>New User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new User, you will need to setup Username and Password.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="name"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setInputs({ name: e.target.value, password: inputs.password })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setInputs({ name: inputs.name, password: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onClose=false;
            }}
          >
            Abort
          </Button>
          <Button
            onClick={() => {
              createUser(inputs.name, inputs.password);
              onClose=false;
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddUser;
