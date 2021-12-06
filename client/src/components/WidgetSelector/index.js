import React from "react";
import {
  Dialog,
  DialogTitle,
} from "@material-ui/core";
import "./index.css";
import datas from "./data.json";
function WidgetSelector(props) {
  return (
    <>
      <Dialog
        open={props.onClose}
        maxWidth="md"
        onBackdropClick={() => props.setClose(false)}
      >
        <DialogTitle>Select a widget</DialogTitle>
        <div class="container">
          {datas.map((item, index) => (
            <div class="card" key={index}>
              <div class="imgBx">
                <img alt={item.alt} src={item.url} />
              </div>
              <div class="contentBx">
                <h2>{item.name}</h2>
                <div class="add" onClick={() => {props.compo(item.type); props.setClose(false)}}>Add</div>
              </div>
            </div>
          ))}
        </div>
      </Dialog>
    </>
  );
}

export default WidgetSelector;
