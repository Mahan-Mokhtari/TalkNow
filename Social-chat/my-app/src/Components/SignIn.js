import React from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Btn.css";
function SignIn(props) {
  let submit = (e) => {
    e.preventDefault();
    console.log("we signed you up");
    let tokenLocal = localStorage.getItem("tokenLocal");
    let name = localStorage.getItem("nameLocal");
    if (tokenLocal === '' ||tokenLocal === 'null' || name === '') {
      props.SignMeIn("sign");
    } else {
      props.RunPopUp("you already are in a account !!!!");
    }
  };
  //run a pop up when clicked
  return (
    <>
      <Form className="fixed" onSubmit={(e) => submit(e)}>
        <Button
          className="BtnSignFrontPage"
          style={{ position: "absolute", top: 0, left: 100, margin: "10px" }}
          type="submit"
        >
          Sign up{'    '}<i className="fa fa-sign-in" aria-hidden="true"></i>
        </Button>
      </Form>
    </>
  );
}
export default SignIn;
