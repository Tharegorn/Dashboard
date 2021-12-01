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
import { addNote } from "../../requests/user_requests"

function AddNote(props) {
    const [inputs, setInputs] = useState({ title: "", content: "" });
    return (
        <>
            <Dialog open={props.onClose} >
                <DialogTitle>New Note</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a new Note, you will need to enter Title and Content.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="title"
                        fullWidth
                        variant="standard"
                        onChange={(e) =>
                            setInputs({ title: e.target.value, content: inputs.content })
                        }
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="content"
                        label="Content"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) =>
                            setInputs({ title: inputs.title, content: e.target.value })
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            props.setClose(false)
                        }}
                    >
                        Abort
                    </Button>
                    <Button
                        onClick={() => {
                            
                            addNote(inputs.title.replace("'", " "), inputs.content.replace("'", " "), localStorage.getItem("session_id"))
                            props.setClose(false)
                        }}
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddNote;
