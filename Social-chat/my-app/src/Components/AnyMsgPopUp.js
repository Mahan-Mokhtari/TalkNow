import React from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/PopUp.css";
function AnyMsgPopUp(props) {
  let name = localStorage.getItem("nameLocal");
  let text = props.text;

  if (name === null || name === undefined || name.toUpperCase() === "GUEST") {
    text = "you arent logged in";
  } else {
    text = props.text + name;
  }
  let submit = (e) => {
    e.preventDefault();
    props.DeletePopUp();
  };


  
  return (
    <>
      <div className="containerrr">
        <div className="form-containerr">
          <Form className="fixed" onSubmit={(e) => submit(e)}>
            <div className="text">
              {text}
              <Button className="BtnSign" type="submit">
                close
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
export default AnyMsgPopUp;
